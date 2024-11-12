import React, { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import uint from '../../images/uing.png';
import { useNavigate,NavLink } from "react-router-dom";
import upload from '../../images/upload.svg';
import OutsideClickHandler from "react-outside-click-handler";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
import toast from "react-hot-toast";
import * as EmailValidator from "email-validator";
import validator from 'validator';
import { FaUpload } from "react-icons/fa6";



const CreateLead2 = ({ setAlert, pop, setPop }) => {
    const { user, createLead, getEmployees ,  AllLeadSource , AllLeadStatus,getLeadStat  } = useMain();
    const [pop1, setPop1] = useState(false);
    const stylePeer = {
        display: pop1 ? "block" : "none"
    }

    let userDetail = JSON.parse(localStorage.getItem("hrms_user"));

    const [emp, setEmp] = useState([]);

    const [formdata, setFormdata] = useState({
        image: "",
        LeadOwner: userDetail?._id,
        Company: "",
        FirstName: "",
        LastName: "",
        Title: "",
        Email: "",
        Phone: "",
        Fax: "",
        Mobile: "",
        Website: "",
        LeadSource: "",
        NoOfEmployee: "",
        Industry: "",
        LeadStatus: "",
        AnnualRevenue: "",
        Rating: "",
        EmailOptOut: "",
        SkypeID: "",
        SecondaryEmail: "",
        Twitter: "",
        Street: "",
        City: "",
        State: "",
        ZipCode: "",
        Country: "",
        DescriptionInfo: ""
    });

    const [emailisValid, setIsemailValid] = useState(null); 
 
    const handleValidation = () => {
        const valid = EmailValidator.validate(formdata.Email);
        setIsemailValid(valid);
      };

      const [isUrlValid, setIsUrlValid] = useState(null);

      const handleInputUrlChange = (value) => {
        if (validator.isURL(value)) {
            setIsUrlValid(true);
        } else {
            setIsUrlValid(false);
        }
      };


    const navigate = useNavigate();

    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];

        if (!imageFile || !imageFile.type.match('image/*')) {
            return toast.error('Please select a valid image file.');
        }

        setFormdata((prev) => ({
            ...prev,
            image: imageFile
        }))
    };

    const changeHandler = async (e) => {
        const { name, value } = e.target;

        setFormdata((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const submitHandler = async () => {
        const toastId = toast.loading("Loading...");
        if(emailisValid === false && formdata.Email !== ""){
          return  toast.error("Please Enter Correct Email")
           }
        if( isUrlValid === false && formdata.Website !== ""){
          return  toast.error("Please Enter Correct Website Link")
           }
        const ans = await createLead({ ...formdata });
        if (ans?.status) {
            navigate("/employeeDash/myLead")
            setFormdata({
                LeadOwner: userDetail?._id,
                Company: "",
                FirstName: "",
                LastName: "",
                Title: "",
                Email: "",
                Phone: "",
                Fax: "",
                Mobile: "",
                Website: "",
                LeadSource: "",
                NoOfEmployee: "",
                Industry: "",
                LeadStatus: "",
                AnnualRevenue: "",
                Rating: "",
                EmailOptOut: "",
                SkypeID: "",
                SecondaryEmail: "",
                Twitter: "",
                Street: "",
                City: "",
                State: "",
                ZipCode: "",
                Country: "",
                DescriptionInfo: ""
            })

            toast.success("Successfuly submit");
        }

        toast.dismiss(toastId);
    }

    const getOwner = async () => {
        const ans = await getEmployees();
        console.log(ans?.data);
        setEmp(ans?.data);
    }

    useEffect(() => {
        getOwner();
    }, [])

    const [allLeadStatus , setAllLeadStatus] = useState([]);
    const [allLeadSource , setAllLeadSource] = useState([]);
    const [allleadStat,setAllLeadStat] = useState([]);


    const fetchStatus = async()=>{
        const ans = await AllLeadStatus();
         setAllLeadStatus(ans?.data);
    }

    const fetchSource = async()=>{
        const ans = await AllLeadSource();
        setAllLeadSource(ans?.data);
    }

    const fetchStat = async()=>{
        const ans = await getLeadStat();
        setAllLeadStat(ans?.data);
    }

    useEffect(()=>{
        fetchStatus();
        fetchSource();
        fetchStat();
    },[])

    return (
        <>
            <div className="employee-dash h-full">
                <EmployeeSidebar pop={pop} setPop={setPop} />

                <div className="tm">
                    <EmployeeNavbar user={user} setAlert={setAlert} />

                    <div className="em">

                        <div className="ghj">
                            <h2 className="semik">Create Lead</h2>
                            <NavLink to="/employeeDash/myLead"><button>Back</button></NavLink>
                            <button onClick={submitHandler} type="button" class="siubmitbtnlead">Submit</button>

                        </div>

                        <form  action="">
                          <div  data-modal-target="default-modal"
                                data-modal-toggle="default-modal" className="uploadprowrap">
                                <img src={uint} alt="unit" />
                                <FaUpload className="FaUploadfds" onClick={()=> setPop1(!pop1)} />

                            </div>

                            <>

                                {/* Main modal */}
                                <OutsideClickHandler
                                    onOutsideClick={() => {
                                        setPop1(false);
                                    }}
                                >
                                    <div
                                        id="default-modal"

                                        tabIndex={-1}
                                        aria-hidden="true"
                                        className="hidden tikra overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                                        style={stylePeer}
                                    >
                                        <div className="relative p-4 w-full max-w-2xl max-h-full">
                                            {/* Modal content */}
                                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                                {/* Modal header */}
                                                <div className=" p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                                    <h3 className="text-xl sini  font-semibold text-gray-900 dark:text-white">
                                                        Select Image
                                                    </h3>
                                                   
                                                </div>
                                                {/* Modal body */}
                                                <div className="selct_div">
                                                    <div className="upload_io">
                                                        <img src={upload} alt="" />
                                                    </div>
                                                    <div className="upload_an mt-4">
                                                        <p>Upload an image here</p>
                                                    </div>
                                                    <div className="opd mt-4">
                                                        <div className="browse">
                                                            <h3>Browse Local Files</h3>
                                                        </div>
                                                        <input type="file" onChange={(e) => {
                                                            handleImageChange(e);
                                                            setPop1(false);
                                                        }} />
                                                    </div>

                                                </div>
                                                {/* Modal footer */}
                                                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </OutsideClickHandler>
                            </>

                            <div className="lead_information mt-6">
                                <h2>Lead Information</h2>

                                <div className="lead_input mt-5">

                                    <div className="lead_inp">
                                        <div className="lead_inp1">
                                            <label htmlFor="">Lead Owner *</label>
                                            <input required type="LeadOwner" value={userDetail?.fullName} disabled onChange={changeHandler} />

                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">Company *</label>
                                            <input required type="text" value={formdata.Company} name="Company" onChange={changeHandler} />
                                        </div>
                                    </div>

                                    <div className="lead_inp">
                                        <div className="lead_inp1 lead_inp11">
                                            <label htmlFor="">First Name *</label>
                                            <select required style={{ width: "91px !important" }} className="selr" name="" id="">
                                                <option>None</option>
                                                <option>Mr</option>
                                                <option>Mrs</option>
                                            </select>
                                        </div>
                                        <div className="lead_inp1">
                                            <label style={{ visibility: "hidden" }} htmlFor="">Company</label>
                                            <input value={formdata.FirstName} name="FirstName" onChange={changeHandler} type="text" />
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">Last Name</label>
                                            <input value={formdata.LastName} name="LastName" onChange={changeHandler} type="text" />
                                        </div>
                                    </div>

                                    <div className="lead_inp">
                                        <div className="lead_inp1">
                                            <label htmlFor="">Title</label>
                                            <input value={formdata.Title} name="Title" onChange={changeHandler} type="text" />
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">Email *</label>
                                            <input required value={formdata.Email} name="Email" 
                                            onChange={(e)=>{
                                                changeHandler(e);
                                                handleValidation(e.target.value);
                                            }}
                                            type="email" className={`${(emailisValid === false && formdata.Email !== "") && "emailvalidinput"}`} />
                                        </div>
                                    </div>

                                    <div className="lead_inp">
                                        <div className="lead_inp1">
                                            <label htmlFor="">Phone *</label>
                                            <input required value={formdata.Phone} name="Phone" onChange={changeHandler} type="number" />
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">Fax</label>
                                            <input value={formdata.Fax} name="Fax" onChange={changeHandler} type="text" />
                                        </div>
                                    </div>

                                    <div className="lead_inp">
                                        <div className="lead_inp1">
                                            <label htmlFor="">Mobile</label>
                                            <input value={formdata.Mobile} name="Mobile" onChange={changeHandler} type="number" />
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">Website</label>
                                            <input value={formdata.Website} name="Website" onChange={(e)=>{
                                                changeHandler(e);
                                                 handleInputUrlChange(e.target.value);
                                            }}  type="text" className={`${(isUrlValid === false && formdata.Website !== "") && "emailvalidinput"}`} />
                                        </div>
                                    </div>

                                    <div className="lead_inp">
                                        <div className="lead_inp1">
                                            <label htmlFor="">Lead Source</label>
                                            <select name="LeadSource" onChange={changeHandler} id="">
                                                <option >Select lead source</option>
                                                {
                                                    allLeadSource?.map((item ,index)=>(
                                                        <option key={index} value={item?.name}>{item?.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">No. of Employees</label>
                                            <input value={formdata.NoOfEmployee} name="NoOfEmployee" onChange={changeHandler} type="number" />
                                        </div>
                                    </div>

                                    <div className="lead_inp">
                                        <div className="lead_inp1">
                                            <label htmlFor="Industry">Industry</label>
                                            <select value={formdata?.Industry} name="Industry" onChange={changeHandler} id="Industry">
                                                <option disabled>Select Industry</option>
                                                <option value="Other">Other</option>
                                                {
                                                    allLeadStatus?.map((item ,index)=>(
                                                        <option key={index} value={item?.name}>{item?.name}</option>
                                                    ))
                                                }

                                            </select>
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">Lead Status *</label>
                                            <select required value={formdata?.LeadStatus} name="LeadStatus" onChange={changeHandler} id="">
                                                <option >Select Status</option>
                                                {
                                                    allleadStat?.map((val,index)=>{
                                                        return (
                                                            <option key={index} value={val?.name}>{val?.name}</option>
                                                        )
                                                    })
                                                }

                                            </select>
                                        </div>
                                    </div>

                                    <div className="lead_inp">
                                        <div className="lead_inp1">
                                            <label htmlFor="">Annual Revenue </label>
                                            <input  value={formdata.AnnualRevenue} name="AnnualRevenue" onChange={changeHandler} placeholder="$" type="number" />
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">Rating</label>
                                            <select name="Rating" onChange={changeHandler} id="">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </select>
                                        </div>

                                    </div>

                                    <div className="lead_inp">
                                        <div className="lead_inp1 lead_inp111">
                                            <label className="jpo" htmlFor="">Email Opt Out</label>
                                            <input value={formdata.EmailOptOut} name="EmailOptOut" onChange={changeHandler} className="seng" type="checkbox" />
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">LinkedIn URL</label>
                                            <input value={formdata?.SkypeID} name="SkypeID" type="text" onChange={changeHandler} />
                                        </div>
                                    </div>

                                    <div className="lead_inp">
                                        <div className="lead_inp1">
                                            <label htmlFor="">Secondary Email</label>
                                            <input value={formdata.SecondaryEmail} name="SecondaryEmail" onChange={changeHandler} type="email" />
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">Twitter</label>
                                            <input value={formdata.Twitter} name="Twitter" onChange={changeHandler} type="text" />
                                        </div>

                                    </div>
                                </div>

                            </div>

                            <div className="lead_information mt-6">
                                <h2>Address Information</h2>
                                <div className="lead_input mt-5">

                                    <div className="lead_inp">
                                        <div className="lead_inp1">
                                            <label htmlFor="">Street</label>
                                            <input value={formdata.Street} name="Street" onChange={changeHandler} type="text" />
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">City</label>
                                            <input value={formdata.City} name="City" onChange={changeHandler} type="text" />
                                        </div>
                                    </div>

                                    <div className="lead_inp">
                                        <div className="lead_inp1">
                                            <label htmlFor="">State</label>
                                            <input value={formdata.State} name="State" onChange={changeHandler} type="text" />
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">Zip Code</label>
                                            <input value={formdata.ZipCode} name="ZipCode" onChange={changeHandler} type="Number" />
                                        </div>
                                    </div>

                                    <div className="lead_inp">
                                        <div className="lead_inp1">
                                            <label htmlFor="">Country</label>
                                            <input value={formdata.Country} name="Country" onChange={changeHandler} type="text" />
                                        </div>
                                        <div style={{ visibility: "hidden" }} className="lead_inp1">
                                            <label htmlFor="">Zip Code</label>
                                            <input value={formdata.ZipCode} name="ZipCode" onChange={changeHandler} type="Number" />
                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div className="lead_information mt-6">
                                <h2>Description Information</h2>
                                <div className="lead_input mt-5">
                                    <div className="lead_inp">
                                        <div className="lead_inp1">
                                            <label htmlFor="">Description</label>
                                            <input value={formdata.DescriptionInfo} name="DescriptionInfo" onChange={changeHandler} type="text" />
                                        </div>
                                    </div>

                                </div>
                            </div>

                          

                        </form>

                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateLead2;
