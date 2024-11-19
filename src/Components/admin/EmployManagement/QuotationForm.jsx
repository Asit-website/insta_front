import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import "./HRMsystem.css";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
import plussing from "../../images/plussing.png";
import inputfileds from "../../images/inputfield.png";
import "./quote.css";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import insta from "../../images/sodag.svg";
import renning from "../../images/rening.png";
import { RxCross2 } from "react-icons/rx";
import hg1 from '../../images/hg1.png';
import hg2 from '../../images/hg2.png';

const QuotationForm = ({ setAlert, pop, setPop }) => {
  const {
    user,
    postQuotationFormApi,
    updateQuotationFormApi,
  } = useMain();

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const location = useLocation();

  const { leadId, item } = location.state;


  const [formdata, setFormdata] = useState({
    quotationNum: "",
    customerName: "",
    quotationDate: "",
    customerCompany: "",
    customerAddress: "",
  });

  const textChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { role } = hrms_user;

  const [preview, setPreivew] = useState(false);

  const navigate = useNavigate();

  const [rows, setRows] = useState([
    {
      subject: "Subject",
      para: [],
    },
    {
      subject: "About",
      para: [],
    },
    {
      subject: "Process",
      para: [],
    },
    {
      subject: "Timeline",
      para: [
        "Timeline	BIS Certification Process Step 1 to 3:  10 -15 Working days",
        "	BIS Certification Process Step 4 to 6:  10-15 Working days",
        "	The complete duration to obtain the BIS certificates will take 20-25 working days",
      ],
    },
    {
      subject: "Validity",
      para: ["2 years"],
    },
    {
      subject: "Commercial Scope",
      para: [],
    },
    {
      subject: "Payment Terms",
      para: [],
    },
    {
      subject: "Our Banking Details",
      para: [
        "Our Banking Details	Bank Detail for the Transaction",
        "Beneficiary: Instacertify Labs Private Limited",
        "Bank Name: YES BANK",
        "Account No: 026485800001318 GSTIN: 09AAGCI8396C1Z7 ",
        "Branch: Ground Mezzanine and First Floor, Plot No.6 Basant Lok, Vasant Vihar New Delhi, Delhi, India-110057 ",
        "IFSC CODE: YESB0000264, Swift code No: YESBINBBDEL (For transfer in USD) ",
      ],
    },
    {
      subject: "Sample Requirement ",
      para: [],
    },
    {
      subject: "Details and Documents Required ",
      para: [],
    },
    {
      subject: "Deliverables",
      para: [],
    },
    {
      subject: "Other Information",
      para: [],
    },
  ]);

  const addPara = (index) => {
    const newRows = [...rows];
    newRows[index].para.push("");
    setRows(newRows);
  };

  const addPara2 = (index) => {
    const newRows = [...rows];
    newRows[index].para.push({ para1: "", para2: "", para3: "" });
    setRows(newRows);
  };

  const removeParaIndex = (index, paraIndex) => {
    const newRows = [...rows];
    newRows[index].para.splice(paraIndex, 1);
    setRows(newRows);
  };

  const handleInputChange = (e, rowIndex, paraIndex) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex].para[paraIndex] = e.target.value;
    setRows(updatedRows);
  };

  const handleInputChange2 = (e, rowIndex, paraIndex, place) => {
    if (place === 1) {
      const updatedRows = [...rows];
      updatedRows[rowIndex].para[paraIndex].para1 = e.target.value;
      setRows(updatedRows);
    } else if (place === 2) {
      const updatedRows = [...rows];
      updatedRows[rowIndex].para[paraIndex].para2 = e.target.value;
      setRows(updatedRows);
    } else {
      // place === 3
      const updatedRows = [...rows];
      updatedRows[rowIndex].para[paraIndex].para3 = e.target.value;
      setRows(updatedRows);
    }
  };

  const postQuotationForm = async () => {
    const toastId = toast.loading("Loading...");

    const postform = {...formdata , userId: hrms_user?._id,leadId: leadId ,  rows};

    const ans = await postQuotationFormApi(postform);
    console.log(ans);

    if (ans?.status) {
      toast.success("Successfuly created");
      setFormdata({
        quotationNum: "",
        customerName: "",
        quotationDate: "",
        customerCompany: "",
        customerAddress: "",
      });

      sessionStorage.removeItem("quotationLogoLink");

      setRows([
        {
          subject: "Subject",
          para: [],
        },
        {
          subject: "About",
          para: [],
        },
        {
          subject: "Process",
          para: [],
        },
        {
          subject: "Timeline",
          para: [
            "Timeline	BIS Certification Process Step 1 to 3:  10 -15 Working days",
            "	BIS Certification Process Step 4 to 6:  10-15 Working days",
            "	The complete duration to obtain the BIS certificates will take 20-25 working days",
          ],
        },
        {
          subject: "Validity",
          para: ["2 years"],
        },
        {
          subject: "Commercial Scope",
          para: [],
        },
        {
          subject: "Payment Terms",
          para: [],
        },
        {
          subject: "Our Banking Details",
          para: [
            "Our Banking Details	Bank Detail for the Transaction",
            "Beneficiary: Instacertify Labs Private Limited",
            "Bank Name: YES BANK",
            "Account No: 026485800001318 GSTIN: 09AAGCI8396C1Z7 ",
            "Branch: Ground Mezzanine and First Floor, Plot No.6 Basant Lok, Vasant Vihar New Delhi, Delhi, India-110057 ",
            "IFSC CODE: YESB0000264, Swift code No: YESBINBBDEL (For transfer in USD) ",
          ],
        },
        {
          subject: "Sample Requirement ",
          para: [],
        },
        {
          subject: "Details and Documents Required ",
          para: [],
        },
        {
          subject: "Deliverables",
          para: [],
        },
        {
          subject: "Other Information",
          para: [],
        },
      ]);
    }
    toast.dismiss(toastId);
  };

  const updateQuotationForm = async () => {
    const toastId = toast.loading("Loading...");

    const postform = {...formdata , userId: hrms_user?._id, leadId: leadId , rows  };
    let id = item?._id;
    const ans = await updateQuotationFormApi(postform , id);

    if (ans?.status) {
      toast.success("Successfuly updated");
      setFormdata({
        quotationNum: "",
        customerName: "",
        quotationDate: "",
        customerCompany: "",
        customerAddress: "",
      });

      navigate(-1);

      setRows([
        {
          subject: "Subject",
          para: [],
        },
        {
          subject: "About",
          para: [],
        },
        {
          subject: "Process",
          para: [],
        },
        {
          subject: "Timeline",
          para: [
            "Timeline	BIS Certification Process Step 1 to 3:  10 -15 Working days",
            "	BIS Certification Process Step 4 to 6:  10-15 Working days",
            "	The complete duration to obtain the BIS certificates will take 20-25 working days",
          ],
        },
        {
          subject: "Validity",
          para: ["2 years"],
        },
        {
          subject: "Commercial Scope",
          para: [],
        },
        {
          subject: "Payment Terms",
          para: [],
        },
        {
          subject: "Our Banking Details",
          para: [
            "Our Banking Details	Bank Detail for the Transaction",
            "Beneficiary: Instacertify Labs Private Limited",
            "Bank Name: YES BANK",
            "Account No: 026485800001318 GSTIN: 09AAGCI8396C1Z7 ",
            "Branch: Ground Mezzanine and First Floor, Plot No.6 Basant Lok, Vasant Vihar New Delhi, Delhi, India-110057 ",
            "IFSC CODE: YESB0000264, Swift code No: YESBINBBDEL (For transfer in USD) ",
          ],
        },
        {
          subject: "Sample Requirement ",
          para: [],
        },
        {
          subject: "Details and Documents Required ",
          para: [],
        },
        {
          subject: "Deliverables",
          para: [],
        },
        {
          subject: "Other Information",
          para: [],
        },
      ]);

      sessionStorage.removeItem("quotationLogoLink");
    }
 
    toast.dismiss(toastId);
  };


  useEffect(() => {
    if (item) {
      const {
        customerAddress,
        customerCompany,
        customerName,
        quotationDate,
        quotationNum,
        rows,
      } = item;
      setRows(rows);
      setFormdata({
        customerAddress,
        customerCompany,
        customerName,
        quotationDate,
        quotationNum,
      });
    }
  }, [location]);

  const contonentPDF = useRef();

  const generatePdf = useReactToPrint({
    content: () => contonentPDF.current,
    documentTitle: "Quotation",
    parentContainer: {
      "@media print": {
        display: "block",
      },
    },
    onAfterPrint: () => alert("success", "item saved"),
  });

  return (
    <>
      <div className="employee-dash h-full">
        {role === "EMPLOYEE" ? (
          <EmployeeSidebar pop={pop} setPop={setPop} />
        ) : (
          <AdminSidebar pop={pop} setPop={setPop} />
        )}

        <div className="tm">
          {role === "EMPLOYEE" ? (
            <EmployeeNavbar user={user} setAlert={setAlert} />
          ) : (
            <AdminNavbar user={user} setAlert={setAlert} />
          )}

          <div className="em">
            <div className="qutaWrap">
              {/* lefft side  */}

              <div className="qutaLeft">
                <div className="qutLTo">
                  <h2>Quotation Form</h2>

                  <div className="qutolobutons">
                    <button onClick={() => setPreivew(true)}>Preview</button>
                    <button
                      onClick={() => {
                        if (item) {
                          updateQuotationForm();
                        } else {
                          postQuotationForm();
                        }
                        generatePdf();
                      }}
                    >
                      Create
                    </button>
                    <button className="cancelbutoons cnebuqo">Cancel</button>
                  </div>
                </div>

                <div className="allwhitebg">
                  <form className="qtoform">
                    <label>
                      <p>Quotation No*</p>
                      <input
                        value={formdata.quotationNum}
                        name="quotationNum"
                        onChange={textChangeHandler}
                        type="text"
                        // placeholder="CRS/9/24-25/317"
                      />
                    </label>

                    <label>
                      <p>Customer Name*</p>
                      <input
                        value={formdata.customerName}
                        name="customerName"
                        onChange={textChangeHandler}
                        type="text"
                        // placeholder="Akash Negi"
                      />
                    </label>

                    <label>
                      <p>Customer Company*</p>
                      <input
                        value={formdata.customerCompany}
                        name="customerCompany"
                        onChange={textChangeHandler}
                        type="text"
                        // placeholder="Company"
                      />
                    </label>

                    <label>
                      <p>Customer Address*</p>
                      <input
                        value={formdata.customerAddress}
                        name="customerAddress"
                        onChange={textChangeHandler}
                        type="text"
                        // placeholder="customer Address"
                      />
                    </label>

                    <label>
                      <p>Quotation Date*</p>
                      <input
                        value={formdata.quotationDate}
                        name="quotationDate"
                        onChange={textChangeHandler}
                        type="date"
                      />
                    </label>
                  </form>

                  <div className="docuThird">
                    <h3>Format</h3>

                    <hr />

                    <div className="allrowwracont">
                      {rows.map((row, index) => (
                        (row.subject !== "Timeline" && row.subject !== "Our Banking Details" && row.subject !== "Validity") && 
                        <div className="bg-white tabletr" key={index}>
                          <p className="rowsubjename">{row.subject}</p>

                          <div className="allparainpusts">
                            {row?.para?.map((item, paraIndex) => (
                              <div key={paraIndex}>
                                {row.subject === "Commercial Scope" ? (
                                  <div className="commercialinputs">
                                    <div className="inpu12">
                                      <input
                                        type="text"
                                        value={item?.para1}
                                        onChange={(e) =>
                                          handleInputChange2(
                                            e,
                                            index,
                                            paraIndex,
                                            1
                                          )
                                        }
                                        placeholder="Particular"
                                      />
                                      <RxCross2
                                        onClick={() => {
                                          removeParaIndex(index, paraIndex);
                                        }}
                                        className="RxCross2aqr"
                                      />
                                    </div>

                                    <div className="inpu12">
                                      <input
                                        type="text"
                                        value={item?.para2}
                                        onChange={(e) =>
                                          handleInputChange2(
                                            e,
                                            index,
                                            paraIndex,
                                            2
                                          )
                                        }
                                        placeholder="Currency"
                                      />
                                      <RxCross2
                                        onClick={() => {
                                          removeParaIndex(index, paraIndex);
                                        }}
                                        className="RxCross2aqr"
                                      />
                                    </div>

                                    <div className="inpu12">
                                      <input
                                        type="text"
                                        value={item?.para3}
                                        onChange={(e) =>
                                          handleInputChange2(
                                            e,
                                            index,
                                            paraIndex,
                                            3
                                          )
                                        }
                                        placeholder="Amount"
                                      />
                                      <RxCross2
                                        onClick={() => {
                                          removeParaIndex(index, paraIndex);
                                        }}
                                        className="RxCross2aqr"
                                      />
                                    </div>
                                  </div>
                                ) : (
                                  <div className="inpu11">
                                    <input
                                      type="text"
                                      value={item}
                                      onChange={(e) =>
                                        handleInputChange(e, index, paraIndex)
                                      }
                                      className=""
                                    />
                                    <RxCross2
                                      onClick={() => {
                                        removeParaIndex(index, paraIndex);
                                      }}
                                      className="RxCross2aqr"
                                    />
                                  </div>
                                )}
                              </div>
                            ))}

                            <div
                              onClick={() => {
                                row.subject === "Commercial Scope"
                                  ? addPara2(index)
                                  : addPara(index);
                              }}
                              className="admorCont cursor-pointer"
                            >
                              <img src={plussing} alt="" />
                              <span>Add {row.subject}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {preview && (
                <div className="previwwraps">
                  <div className="qutaRight">
                    <div ref={contonentPDF} className="conepdfref">

                    <img className="hg1" src={hg1} alt="" />
                    <div  className="qutaRightcont">
                  
                      <div className="hdquot">
                       
                        <img src={insta} alt="" />

                        <div className="hdqortright">
                          <p className="labs">INSTACERTIFY LABS PVT LTD</p>
                          <p className="labs1">PK 1 Sector 63 A Noida</p>
                          <p className="labs1">Uttar Pradesh, india-201301</p>
                          <p className="labs1">+91 9999118039</p>
                          <p className="labs1">contact@instacertify.com</p>
                          <p className="labs1">www.instacertify.com</p>
                          <p className="labs">CIN: UP74999UP2022PTC170291</p>
                        </div>
                      </div>

                      <hr />

                      <div className="hdqro2wrap">
                        <div className="hdqrotp1">
                          <p>No. {formdata.quotationNum}</p>
                          <p>Date : {formdata.quotationDate}</p>
                        </div>

                        <div className="quotcusdetail">
                          <p> To,</p>
                          <p>{formdata?.customerName}</p>
                          <p>{formdata?.customerCompany}</p>
                          <p>{formdata?.customerAddress}</p>
                        </div>
                      </div>

                      <h3 className="qutoletheading">QUOTATION LETTER</h3>

                      <div className="talbeLike">
                        <div class="relative w-full">
                          <table className="quotablle2 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse border border-black">
                            <thead className="theadqu2">
                    
                            </thead>
                            <tbody>
                              {rows?.map((row, index) => (
                                <tr
                                  className="bg-white tabletr2 border border-black"
                                  key={index}
                                >
                                  <td className="px-2 py-4 border border-black sikl">
                                    {row.subject}
                                  </td>

                                  <td className="addpaddingo w-full ">
                                    {row.subject === "Commercial Scope" ? (
                                      <table className="w-full addmargin0">
                                        <thead className="theadqu22">
                                          <tr>
                                            <th className="px-2 py-2 particluwith ">
                                              	Particular 	 
                                            </th>
                                            <th className="px-2 py-2 ">
                                            Currency
                                            </th>
                                            <th className="px-2 py-2 ">
                                            Amount
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {row.para.map((item, paraIndex) => (
                                            <tr
                                              key={paraIndex}
                                              className=""
                                            >
                                              <td className="px-2 py-2 para1qutaos">
                                                {item.para1}
                                              </td>
                                              <td className="px-2 py-2  para1qutaos">
                                                {item.para2}
                                              </td>
                                              <td className="px-2 py-2  para1qutaos">
                                                {item.para3}
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    ) : (
                                      // Render regular list for other rows
                                      <ul className="list-disc">
                                        {row.para.map((para, paraIndex) => (
                                          <li
                                            className={`adpading ${
                                              paraIndex <
                                                row?.para?.length - 1 &&
                                              "list-discli"
                                            }`}
                                            key={paraIndex}
                                          >
                                            {para}
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <p className="downpara">
                        For other Product Certification, Compliance, Testing and
                        Equipment’s please visit us at www.instacertify.com for
                        more details.
                      </p>
                    </div>

                    <div className="thanking">
                      <p>Thanking You</p>
                      <img width="220" src={renning} alt="" />
                      <p className="for">
                        For Instacertify Labs Private Limited
                      </p>
                    </div>

                    <hr />
                    {/* <footer className="quotation_fruit">
                      <p>www.instacertify.com</p>
                    </footer> */}
                    <img className="hg1" src={hg2} alt="hg2" />

                    </div>

                    <div className="prntBtn">
                      <button className="canct" onClick={() => setPreivew(false)}>
                        <span>Cancel</span>
                      </button>
                      <button
                        onClick={() => {
                          if (item) {
                            updateQuotationForm();
                          } else {
                            postQuotationForm();
                          }
                          generatePdf();
                        }}
                      >
                        <span>Print</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default QuotationForm;
