import React, { useState, useEffect } from "react";
import { config } from "../constant";
import axios from "axios";
import { Formik, Field } from "formik";

// reactstrap components
import {
  Button,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Input,
  UncontrolledCollapse,
} from "reactstrap";
import * as yup from "yup";

// core components
import SideBar from "components/SideBar.js";
import AamsHeader from "components/AamsHeader.js";
import AamsFooter from "components/AamsFooter.js";
import AamssEngagementSetup from "components/aamsEngagement_Setup.js";
import moment from "moment";

const getDealDetailsUrl = config.url.API_URL + "deal/";
const getPaymentPeriodUrl = config.url.API_URL+"payment-period";
const getDealFlagUrl = config.url.API_URL + "deal-flag?DealID=";
const postDealFlagUrl = config.url.API_URL + "deal-flag";

function DealEngagement(props) {
  const [dealDetails, setDealDetails] = useState([]);
  const [isEditDealInfo, setEditDealInfoStatus] = useState(false);
  const [dealTypes, setDealTypes] = useState([]);
  const [dealRoles, setDealRoles] = useState([]);
  const [dealId, setDealId] = useState(null);
  const [dealPartyMembers, setPartyMember] = useState([]);
  const [isDealParameterEdit, setDealParameterEdit]=useState(false)
	const [paymentPeriods, setPaymentPeriods] = useState([]);	
  const [dealFlags, setDealFlags] = useState([])
  const [dealFlagToggle, setDealFlagToggle] = useState('')
  const [selectedEng, setSelectedEng] = useState(0);


  const dealInfoFormValidationSchema = yup.object().shape({
    name: yup.string().required(),
    id: yup.string().required(),
    description: yup.string().required(),
    dealTypeID: yup.string().required(),
    originator: yup.string().required(),
    initialSize: yup.string().required(),
    closingDate: yup.string().required(),
  });
  const dealParameterFormValidationSchema = yup.object().shape({
    id: yup.string().required(),
    initialPaymentDate : yup.string().required(),
    determinationDateDescription : yup.string().required(),
    paymentDateDescription : yup.string().required(),
    paymentPeriodID:yup.string().required()
  });
  const dealPartyMemberAddFormValidationSchema = yup.object().shape({
    name: yup.string().required('Party is required'),
    roleID: yup.string().required(),
    dealID: yup.string().required(),
    primaryContact: yup.string().required('Primay Contact is required'),
  });
  const getDealFlagWithAxios = async () => {
    const response = await axios.get(getDealFlagUrl + props.match.params.id);
    console.log("dealFlag", response);
    const dealDetails = response.data.responseData;
    dealDetails.map(element => {
      if(element.isSet === true)
        setDealFlagToggle(element.flagCode)
    });
    setDealFlags(dealDetails);
  };
  const getDealDetailsWithAxios = async () => {
    const response = await axios.get(getDealDetailsUrl + props.match.params.id);
    //console.log("deal", response);
    const dealDetails = response.data.responseData;
    setDealDetails(dealDetails);
    ////console.log(posts);
  };
  const getPaymentPeriods = async () => {
		const res = await axios.get(getPaymentPeriodUrl);
		////console.log(res.data.responseData);
		const paymentPeriods = res.data.responseData;
		setPaymentPeriods(paymentPeriods);
	};
  const setDealDetailsWithAxios = async (values) => {
    try {
      const response = await axios.put(config.url.API_URL + "deal", values);
      ////console.log(response);
      const dealDetails = response.data.responseData;
      getDealDetailsWithAxios();
      setEditDealInfoStatus(false);
      setDealParameterEdit(false)
      ////console.log(posts);
    } catch (err) {
      //console.log("error update>>>", err);
    }
  };
  const getDealTypes = async () => {
    const response = await axios.get(config.url.API_URL + "deal-type");
    //console.log("dealTypes:", response);
    const data = response.data.responseData;
    setDealTypes([...data]);
    ////console.log(posts);
  };
  const getDealRoles = async () => {
    const response = await axios.get(config.url.API_URL + "deal-role");
    //console.log("dealTypes:", response);
    const data = response.data.responseData;
    setDealRoles([...data]);
    ////console.log(posts);
  };
  const getDealPartyMember = async () => {
    const response = await axios.get(
      config.url.API_URL + "deal-party-member?DealID=" + props.match.params.id
    );
    //console.log("getDealPartyMember:", response);
    const data = response.data.responseData;
    setPartyMember([...data]);
  };
  const setDealPartyMember = async (values) => {
    try {
      const response = await axios.post(
        config.url.API_URL + "deal-party-member",
        values
      );
      ////console.log(response);
      const dealDetails = response.data.responseData;
      // alert("Deal party member has been updated successfully");
      getDealPartyMember();
      ////console.log(posts);
    } catch (err) {
      //console.log("error update>>>", err);
    }
  };
  const delDealPartyMember = async (id) => {
    try {
      if (window.confirm("Are you sure ?")) {
        const response = await axios.delete(
          config.url.API_URL + "deal-party-member/" + id
        );
        // alert("Party member has been deleted successfully");
        getDealPartyMember();
      }
    } catch (err) {
      alert("Server error. Please try after sometime.");
    }
  };

  const handleFlagChange = async e =>{
    console.log("target",e.target.value)
    const flags = e.target.value.split(',')
    const values = {
      "dealID": props.match.params.id,
      "flagID": flags[0],
      "isSet": true
    }
    setDealFlagToggle(flags[1])
    const response = await axios.post(postDealFlagUrl, values)
    console.log("flagres =>",response)
  }

  useEffect(() => {
    getDealDetailsWithAxios();
    getDealTypes();
    getDealRoles();

    getDealPartyMember();
    getPaymentPeriods()
    getDealFlagWithAxios()
  }, []);
  useEffect(() => {
    setDealId(() => props?.match?.params.id);
    //console.log("props>>>", props, dealId);
  }, [props]);
  return (
    <>
      <SideBar />
      <div id='main_wraper' className=''>
        <AamsHeader />
        <div id='deal_engagement_details_page'>
          <div className='clent-box-row new-two-row'>
            <div className='row new-two-row-one'>
              <div className='col-md-2 pr-0 '>
                <div className='client-name left-box-client'>
                  Client's name:
                </div>
              </div>
              <div className='col-md-10 pl-0 '>
                <div className='client-name-text right-box-client'>
                  Metropolitan
                </div>
              </div>
            </div>
            <div className='row new-two-row-two'>
              <div className='col-md-2 pr-0 '>
                <div className='client-name left-box-client'>Deal name:</div>
              </div>
              <div className='col-md-10 pl-0 '>
                <div className='client-name-text right-box-client'>
                  {dealDetails.name}
                  {/*<Button href='blank' className='btn btn-link m-0 p-0'>
                    <i className='fas fa-edit'></i>
					  </Button>*/}
                </div>
              </div>
            </div>
          </div>

          <Row>
            <Col sm='8'>
              {/* start */}
              <div
                className='accordion accordion-flush'
                id='accordionFlushExample'
              >
                <div className='accordion-item'>
                  <h2 className='accordion-header' id='flush-headingOne'>
                    <button
                      className='accordion-button'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#flush-collapseOne'
                      aria-expanded='true'
                      aria-controls='flush-collapseOne'
                    >
                      Deal Information
                    </button>
                  </h2>
                  <div
                    id='flush-collapseOne'
                    className='accordion-collapse collapsed'
                    aria-labelledby='flush-headingOne'
                    data-bs-parent='#accordionFlushExample'
                  >
                    <div className='accordion-body'>
                      {isEditDealInfo ? (
                        <>
                          <Formik
                            initialValues={{
                              id: dealDetails.id,
                              name: dealDetails.name,
                              description: dealDetails.description,
                              dealTypeID: dealDetails.dealTypeID,
                              originator: dealDetails.originator,
                              initialSize: dealDetails.initialSize,
                              closingDate: new moment(
                                dealDetails.closingDate
                              ).format("YYYY-MM-DD"),
                            }}
                            validationSchema={dealInfoFormValidationSchema}
                            onSubmit={setDealDetailsWithAxios}
                          >
                            {({
                              values,
                              errors,
                              touched,
                              handleChange,
                              handleSubmit,
                              /* and other goodies */
                            }) => (
                              <form onSubmit={handleSubmit}>
                                <Button
                                  className='deal-update btn btn-primary'
                                  type='submit'
                                  //   onClick={() =>
                                  //     setEditDealInfoStatus((ds) => !ds)
                                  //   }
                                >
                                  <i class='fas fa-save'></i>
                                </Button>
                                <div className='row'>
                                  <div className='col-md-4'>
                                    <div className='deal-left-title'>
                                      Deal Name:
                                    </div>
                                  </div>
                                  <div className='col-md-4'>
                                    <div className='deal-right-text'>
                                      <Field
                                        type='text'
                                        class='form-control'
                                        name='name'
                                      />
                                      {errors.name && touched.name ? (
                                        <div class='error'>{errors.name}</div>
                                      ) : null}
                                    </div>
                                  </div>
                                </div>
                                <div className='row mt-3'>
                                  <div className='col-md-4'>
                                    <div className='deal-left-title'>
                                      Deal Type:
                                    </div>
                                  </div>
                                  <div className='col-md-8'>
                                    <div className='deal-right-text'>
                                      <Field
                                        as='select'
                                        class='form-control'
                                        name='dealTypeID'
                                      >
                                        {dealTypes?.map((d) => {
                                          return (
                                            <option value={d.id}>
                                              {d.name}
                                            </option>
                                          );
                                        })}
                                      </Field>
                                      {errors.dealTypeID &&
                                      touched.dealTypeID ? (
                                        <div class='error'>
                                          {errors.dealTypeID}
                                        </div>
                                      ) : null}
                                    </div>
                                  </div>
                                </div>
                                <div className='row mt-3'>
                                  <div className='col-md-4'>
                                    <div className='deal-left-title'>
                                      Deal Description:
                                    </div>
                                  </div>
                                  <div className='col-md-8'>
                                    <div className='deal-right-text'>
                                      <Field as="textarea"
                                        class='form-control'
                                        name='description'
                                      />
                                        
                                      {errors.description &&
                                      touched.description ? (
                                        <div class='error'>
                                          {errors.description}
                                        </div>
                                      ) : null}
                                    </div>
                                  </div>
                                </div>
                                <div className='row mt-3'>
                                  <div className='col-md-4'>
                                    <div className='deal-left-title'>
                                      Originator:
                                    </div>
                                  </div>
                                  <div className='col-md-8'>
                                    <div className='deal-right-text'>
                                      <Field
                                        type='text'
                                        name='originator'
                                        id='originator '
                                        placeholder='Enter Originator'
                                        class='form-control'
                                      />
                                      {errors.originator &&
                                      touched.originator ? (
                                        <div class='error'>
                                          {errors.originator}
                                        </div>
                                      ) : null}
                                    </div>
                                  </div>
                                </div>

                                <div className='row mt-3'>
                                  <div className='col-md-4'>
                                    <div className='deal-left-title'>
                                      Deal Closing Date: <br />{" "}
                                      <small>If already Closed</small>
                                    </div>
                                  </div>
                                  <div className='col-md-8'>
                                    <div className='deal-right-text'>
                                      <Field
                                        type='date'
                                        name='closingDate'
                                        id='closingDate'
                                        placeholder='Select Date'
                                        class='form-control'
                                      />
                                      {errors.closingDate &&
                                      touched.closingDate ? (
                                        <div class='error'>
                                          {errors.closingDate}
                                        </div>
                                      ) : null}
                                    </div>
                                  </div>
                                </div>
                                <div className='row mt-3'>
                                  <div className='col-md-4'>
                                    <div className='deal-left-title'>
                                      Initial Deal Size
                                    </div>
                                  </div>
                                  <div className='col-md-8'>
                                    <div className='deal-right-text'>
                                      <Field
                                        type='number'
                                        name='initialSize'
                                        id='initialSize '
                                        placeholder='Enter initialSize'
                                        class='form-control'
                                      />
                                      {errors.initialSize &&
                                      touched.initialSize ? (
                                        <div class='error'>
                                          {errors.initialSize}
                                        </div>
                                      ) : null}
                                    </div>
                                  </div>
                                </div>
                              </form>
                            )}
                          </Formik>
                        </>
                      ) : (
                        <>
                          <Button
                            className='deal-edit'
                            onClick={() => setEditDealInfoStatus((ds) => !ds)}
                          >
                            <i className='fas fa-edit' aria-hidden='true'></i>
                          </Button>
                          <div className='row'>
                            <div className='col-md-4'>
                              <div className='deal-left-title'>Deal Name:</div>
                            </div>
                            <div className='col-md-8'>
                              <div className='deal-right-text'>
                                {dealDetails.name}{" "}
                              </div>
                            </div>
                          </div>
                          <div className='row mt-3'>
                            <div className='col-md-4'>
                              <div className='deal-left-title'>Deal Type:</div>
                            </div>
                            <div className='col-md-8'>
                              <div className='deal-right-text'>
                                {dealDetails.dealTypeName}{" "}
                              </div>
                            </div>
                          </div>
                          <div className='row mt-3'>
                            <div className='col-md-4'>
                              <div className='deal-left-title'>
                                Deal Description:
                              </div>
                            </div>
                            <div className='col-md-8'>
                              <div className='deal-right-text'>
                                {dealDetails.description}
                              </div>
                            </div>
                          </div>
                          <div className='row mt-3'>
                            <div className='col-md-4'>
                              <div className='deal-left-title'>Originator:</div>
                            </div>
                            <div className='col-md-8'>
                              <div className='deal-right-text'>
                                {dealDetails.originator}
                              </div>
                            </div>
                          </div>

                          <div className='row mt-3'>
                            <div className='col-md-4'>
                              <div className='deal-left-title'>
                                Deal Closing Date: <br />{" "}
                                <small>If already Closed</small>
                              </div>
                            </div>
                            <div className='col-md-8'>
                              <div className='deal-right-text'>
                                {dealDetails.closingDate && new Date(
                                  dealDetails.closingDate
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  day: "numeric",
                                  month: "numeric",
                                })}{" "}
                              </div>
                            </div>
                          </div>
                          <div className='row mt-3'>
                            <div className='col-md-4'>
                              <div className='deal-left-title'>
                                Initial Deal Size
                              </div>
                            </div>
                            <div className='col-md-8'>
                              <div className='deal-right-text'>
                                {dealDetails.initialSize}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className='accordion-item'>
                  <h2 className='accordion-header' id='flush-headingTwo'>
                    <button
                      className='accordion-button collapsed'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#flush-collapseTwo'
                      aria-expanded='false'
                      aria-controls='flush-collapseTwo'
                    >
                      Deal Parties
                    </button>
                  </h2>
                  <div
                    id='flush-collapseTwo'
                    className='accordion-collapse collapse'
                    aria-labelledby='flush-headingTwo'
                    data-bs-parent='#accordionFlushExample'
                  >
                    <div className='accordion-body p-1'>
                      {/* <Button href='blank' className='deal-edit'>
                        <i className='fas fa-edit' aria-hidden='true'></i>
                      </Button> */}
                      <Formik
                        initialValues={{
                          dealID: props.match.params.id,
                          roleID: "",
                          name: "",
                          primaryContact: "",
                        }}
                        validationSchema={
                          dealPartyMemberAddFormValidationSchema
                        }
                        onSubmit={(values, { resetForm }) => {
                          //console.log("values>>", values);
                          setDealPartyMember(values);
                          resetForm();
                          getDealPartyMember();
                        }}
                      >
                        {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleSubmit,
                          /* and other goodies */
                        }) => (
                          <form onSubmit={handleSubmit}>
                            <div class='row pt-4'>
                              <div class='col-md-4'>
                                <Field
                                  as='select'
                                  class='form-select'
                                  id='roleID'
                                  name='roleID'
                                  required
                                >
                                  <option>Select Role</option>
                                  {dealRoles?.map((dr) => (
                                    <option value={dr.id}>{dr?.name}</option>
                                  ))}
                                </Field>
                                {errors.roleID && touched.roleID ? (
                                  <div class='error'>{errors.roleID}</div>
                                ) : null}
                              </div>
                              <div class='col-md-4'>
                                <Field
                                  type='text'
                                  class='form-control'
                                  id='name'
                                  placeholder='Party  '
                                  name='name'
                                  required
                                />
                                {errors.party && touched.party ? (
                                  <div class='error'>{errors.party}</div>
                                ) : null}
                              </div>
                              <div class='col-md-4'>
                                <Field
                                  type='text'
                                  class='form-control'
                                  id='primaryContact'
                                  placeholder='Primary Contact'
                                  name='primaryContact'
                                  required
                                />
                                {errors.primaryContact &&
                                touched.primaryContact ? (
                                  <div class='error'>
                                    {errors.primaryContact}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                            <div class='party-save mt-3'>
                              {/* <a
                                href='javascript:void(0);'
                                class='btn btn-danger'
                              >
                                <i
                                  class='fa fa-arrow-left'
                                  aria-hidden='true'
                                ></i>
                              </a> */}
                              <button
                                href='javascript:void(0)'
                                class='btn btn-primary'
                                type='submit'
                              >
                                <i class='fas fa-save'></i>
                              </button>
                            </div>
                          </form>
                        )}
                      </Formik>
                      <table className='table table-striped mb-0'>
                        <thead>
                          <tr>
                            <th width='30%'>Deal/Role</th>
                            <th width='10%'>Party</th>
                            <th width='40%'>Primary Contact</th>
                            <th width='20%'>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dealPartyMembers?.map((d) => {
                            return (
                              <tr>
                                <td>{d?.roleName} </td>
                                <td>{d?.name} </td>
                                <td>{d?.primaryContact}</td>
                                <td>
                                  <button
                                    onClick={() => delDealPartyMember(d?.id)}
                                  >
                                    <i class='fa fa-trash'></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                          {/* <tr>
                            <td>Angelina Vitale </td>
                            <td>Test </td>
                            <td>Test</td>
                          </tr>
                          <tr>
                            <td>Angelina Vitale </td>
                            <td>Test </td>
                            <td>Test</td>
                          </tr>
                          <tr>
                            <td>Angelina Vitale </td>
                            <td>Test </td>
                            <td>Test</td>
                          </tr> */}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className='accordion-item'>
                  <h2 className='accordion-header' id='flush-headingThree'>
                    <button
                      className='accordion-button collapsed'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#flush-collapseThree'
                      aria-expanded='false'
                      aria-controls='flush-collapseThree'
                    >
                      AMSS Engagement Setup
                    </button>
                  </h2>
                  <div
                    id='flush-collapseThree'
                    className='accordion-collapse collapse'
                    aria-labelledby='flush-headingThree'
                    data-bs-parent='#accordionFlushExample'
                  >
                    <div className='accordion-body'>
                      <AamssEngagementSetup deal={dealDetails.id} selectedEng={selectedEng} setSelectedEng={setSelectedEng}/>
                    </div>
                  </div>
                </div>
              </div>
              {/* end */}
            </Col>
            <Col sm='4'>
              <Card className='mt-3'>
                <CardBody className='p-0'>
                  <CardTitle tag='h4'>Deal Flags</CardTitle>
                  <div className='py-3 text-center'>
                    <div className='form-check form-switch pl-0'>
                      <label
                        className='form-check-label left '
                        htmlFor='flexSwitchCheckDefault'
                      >
                        {" "}
                        Defaulted ?{" "}
                      </label>
                      {dealFlagToggle === '' ? (
                      <Input
                        className='form-check-input '
                        type='checkbox'
                        role='switch'
                        id='flexSwitchCheckDefault'
                         
                      />):
                      (<Input
                        className='form-check-input '
                        type='checkbox'
                        role='switch'
                        id='flexSwitchCheckDefault'
                        checked
                      />)}
                      {dealFlagToggle === '' ? (
                          <select name="dealFlag" onChange={handleFlagChange}>
                          <option>Select</option>
                          {dealFlags?.map((dr) =>(
                              <option value={dr.flagID +','+ dr.flagCode}>{dr?.flagCode.replace('DEFAULTED_', '')}</option>
                            )
                          )}
                        </select>
                      )
                      :
                      (
                        <label style={{paddingLeft : "15px"}}>{dealFlagToggle.replace('DEFAULTED_', '')}</label>
                      )

                      }
                      
                      {/* {dealFlags?.map((dr, i) =>{ 
                        if(dr.isSet){
                        return (
                          <div>{dr.flagCode.replace('DEFAULTED_', '')}</div>
                        )} 
                      })} */}
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card className='mt-3'>
                <CardBody className='p-0'>
                  <CardTitle tag='h4'>
                    Deal Parameters{" "}
                    <span className='float-end'>
                      <Button
                        // color="primary"
                        id='toggler'
                        style={{
                          margin: "0 8px 0 0",
                          padding: "0",
                          backgroundColor: "rgba(0,0,0,0)",
                        }}
                      >
                        <i className='fas fa-eye'></i>
                      </Button>
                    </span>
                  </CardTitle>

                  <UncontrolledCollapse toggler='#toggler' defaultOpen={true}>
                  <Formik initialValues={{
                    initialPaymentDate : dealDetails?.initialPaymentDate && moment(dealDetails?.initialPaymentDate).format('YYYY-MM-DD'),
                    determinationDateDescription : dealDetails?.determinationDateDescription,
                    paymentDateDescription : dealDetails?.paymentDateDescription && moment(dealDetails?.paymentDateDescription).format('YYYY-MM-DD'),
                    paymentPeriodID : dealDetails?.paymentPeriodID,
                    id : dealDetails?.id,
                    name:dealDetails?.name,
                    DealTypeID : dealDetails?.dealTypeID,
                    Description : dealDetails?.description
                    }}
                    onSubmit={(values)=>setDealDetailsWithAxios(values)}
                    enableReinitialize={true}
                    validationSchema={dealParameterFormValidationSchema}
                    >
                    
                  {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleSubmit,
                          /* and other goodies */
                        }) => (
                          <form onSubmit={handleSubmit}>
                    <div className='content-box-main p-3'>
                      <h2 className='color-red mb-3'>Deal Payment Terms 
                      {!isDealParameterEdit?
                      <button class="float-end" type="button" onClick={(e)=>{
                        e.preventDefault();
                        setDealParameterEdit(()=>true)}}>
                        <i class="fa fa-edit "></i></button>:
                        <button class="float-end" type="submit">
                        <i class="fas fa-save "></i></button>}
                        </h2>
                        {isDealParameterEdit?<>


                          <div className='parameter-row'>
                        <p>Payment Start Date:</p>
                        <Field type="date" name="initialPaymentDate" class="form-control"/>
                        {errors.initialPaymentDate &&
                                touched.initialPaymentDate ? (
                                  <div class='error'>
                                    {errors.initialPaymentDate}
                                  </div>
                                ) : null}
                      </div>
                      <div className='parameter-row mt-2'>
                        <p>Determination Date:</p>
                        <Field type="text" name="determinationDateDescription" class="form-control"/>
                        {errors.determinationDateDescription &&
                                touched.determinationDateDescription ? (
                                  <div class='error'>
                                    {errors.determinationDateDescription}
                                  </div>
                                ) : null}
                      </div>
                      <div className='parameter-row mt-2'>
                        <p>Payment Date:</p>
                        <Field type="date" name="paymentDateDescription" class="form-control"/>
                        {errors.paymentDateDescription &&
                                touched.paymentDateDescription ? (
                                  <div class='error'>
                                    {errors.paymentDateDescription}
                                  </div>
                                ) : null}
                      </div>

                      <div className='parameter-row mt-2'>
                        <p>Payment Frequency: </p>
                        <Field as="select" name="paymentPeriodName" class="form-control">
                          <option>Select please</option>
                          {paymentPeriods.length>0 && paymentPeriods.map(pp=><option key={'pay_'+pp.id} selected={pp.id===dealDetails?.paymentPeriodID} value={pp.id}>{pp.name}</option>)}
                        </Field>
                        {errors.paymentPeriodName &&
                                touched.paymentPeriodName ? (
                                  <div class='error'>
                                    {errors.paymentPeriodName}
                                  </div>
                                ) : null}
                      </div>

                        </>:<>
                        
                      <div className='parameter-row'>
                        <p>Payment Start Date:</p>
                        <span className='parameter-date'>
                          {dealDetails.initialPaymentDate && new Date(
                            dealDetails.initialPaymentDate
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            day: "numeric",
                            month: "numeric",
                          })}{" "}
                        </span>
                      </div>
                      <div className='parameter-row mt-2'>
                        <p>Determination Date:</p>
                        <span className='parameter-date'>
                          {dealDetails.determinationDateDescription}
                        </span>
                      </div>
                      <div className='parameter-row mt-2'>
                        <p>Payment Date:</p>
                        <span className='parameter-date'>
                          {dealDetails.paymentDateDescription}
                        </span>
                      </div>

                      <div className='parameter-row mt-2'>
                        <p>Payment Frequency: </p>
                        <span className='parameter-date'>
                          {dealDetails.paymentPeriodName}
                        </span>
                      </div>
                      </>
                      }
                    </div>
                    </form>
                        )}
                    </Formik>

                  </UncontrolledCollapse>
                </CardBody>
              </Card>
              <div></div>
            </Col>
          </Row>
        </div>
        <AamsFooter />
      </div>
    </>
  );
}

export default DealEngagement;
