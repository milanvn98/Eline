import styles from "./EmployerRequest.module.css";
import useValidate from "../../hooks/useValidate";
import { useEffect, useState } from "react";
import qs from "qs";
import { useHistory } from "react-router-dom";
import useHttp from "../../hooks/useHttp";
import BlackButton from "../Elements/BlackButton";

const EmployerRequest = (props) => {
  const history = useHistory();
  const params = qs.parse(history.location.search.split("?")[1]);
  const comp = params["company"];
  const empName = params["firstName"];

  const { value: company, valueChangeHandler: companyChangeHandler, inputBlurHandler: companyBlurHandler } = useValidate((value) => value !== "");
  const { value: firstName, isValid: firstNameIsValid, valueChangeHandler: firstNameChangeHandler, inputBlurHandler: firstNameBlurHandler, valueClass: firstNameClass } = useValidate((value) => value.trim() !== "");
  const { value: lastName, isValid: lastNameIsValid, valueChangeHandler: lastNameChangeHandler, inputBlurHandler: lastNameBlurHandler, valueClass: lastNameClass } = useValidate((value) => value.trim() !== "");
  const { value: email, isValid: emailIsValid, valueChangeHandler: emailChangeHandler, inputBlurHandler: emailBlurHandler, valueClass: emailClass } = useValidate((value) => value !== "" && value.trim().includes("@") && value.trim().includes("."));
  const { value: phone, valueChangeHandler: phoneChangeHandler, inputBlurHandler: phoneBlurHandler } = useValidate((value) => true);
  const { value: employmentBasis, isValid: employmentBasisIsValid, valueChangeHandler: employmentBasisChangeHandler, inputBlurHandler: employmentBasisBlurHandler, valueClass: employmentBasisClass } = useValidate((value) => value.trim() !== "");
  const { value: jobTitle, valueChangeHandler: jobTitleChangeHandler, inputBlurHandler: jobTitleBlurHandler } = useValidate((value) => true);
  const { value: rate, valueChangeHandler: rateChangeHandler, inputBlurHandler: rateBlurHandler } = useValidate((value) => true);
  const { value: startDate, isValid: startDateIsValid, valueChangeHandler: startDateChangeHandler, inputBlurHandler: startDateBlurHandler, valueClass: startDateClass } = useValidate((value) => value !== "");
  const { value: classification, valueChangeHandler: classificationChangeHandler, inputBlurHandler: classificationBlurHandler } = useValidate((value) => true);
  const { value: notes, valueChangeHandler: notesChangeHandler, inputBlurHandler: notesBlurHandler } = useValidate((value) => true);

  const [invalidInput, setInvalidInput] = useState();
  const { isLoading, sendRequest } = useHttp();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    
    sendRequest({
        url: 'clients/' + comp
    }, response => {
        const client = response.data[0]
        companyChangeHandler({_id: client['_id'], company: client['company']});
        companyBlurHandler();
    })
   
  }, [sendRequest, companyChangeHandler, companyBlurHandler, comp]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (firstNameIsValid && lastNameIsValid && emailIsValid && employmentBasisIsValid && startDateIsValid) {
      const data = {
        contact: {
          company,
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
        },
        position: {
          job_title: jobTitle,
          start_date: new Date(startDate),
          classification,
          employment_basis: employmentBasis,
          rate,
          notes,
        },
        status: "authorise",
      };

      sendRequest(
        {
          url: "requests",
          method: "POST",
          body: data,
        },
        (response) => {
          setSuccess(true);
        }
      );
    } else {
      if (!startDateIsValid) {
        setInvalidInput("Please complete the start date.");
      }
      if (!employmentBasisIsValid) {
        setInvalidInput("Please select the employment basis");
      }
      if (!emailIsValid) {
        setInvalidInput("Please enter a valid email");
      }
      if (!lastNameIsValid) {
        setInvalidInput("Please complete the last name.");
      }
      if (!firstNameIsValid) {
        setInvalidInput("Please complete the first name.");
      }
    }
  };

  return (
    <>
      {success ? (
        <div className={styles["success-container"]}>
          <h1>Submission Received. Thank you.</h1>
        </div>
      ) : (
        <div className={styles["fw-container"]}>
          <div className={styles["request-container"]}>
            <h1>Hello {empName}!</h1>
            <p>Here is your new employee onboarding form. Please complete the details below and we'll take care of the rest!</p>
            <form onSubmit={submitHandler}>
              <div className={styles.container}>
                <input
                  type="text"
                  placeholder="employee first name"
                  value={firstName}
                  onChange={(e) => {
                    firstNameChangeHandler(e.target.value);
                  }}
                  onBlur={firstNameBlurHandler}
                  className={firstNameClass}
                />
                <input
                  type="text"
                  placeholder="employee last name"
                  value={lastName}
                  onChange={(e) => {
                    lastNameChangeHandler(e.target.value);
                  }}
                  onBlur={lastNameBlurHandler}
                  className={lastNameClass}
                />
              </div>
              <div className={styles.container}>
                <input
                  type="text"
                  placeholder="employee email"
                  value={email}
                  onChange={(e) => {
                    emailChangeHandler(e.target.value);
                  }}
                  onBlur={emailBlurHandler}
                  className={emailClass}
                />
                <input
                  type="text"
                  placeholder="employee phone"
                  value={phone}
                  onChange={(e) => {
                    phoneChangeHandler(e.target.value);
                  }}
                  onBlur={phoneBlurHandler}
                />
              </div>
              <div className={styles.container}>
                <select
                  value={employmentBasis}
                  onChange={(e) => {
                    employmentBasisChangeHandler(e.target.value);
                  }}
                  onBlur={employmentBasisBlurHandler}
                  className={`${employmentBasisClass} ${styles.select}`}
                >
                  <option hidden>employment basis</option>
                  <option value={"FULLTIME"}>Full Time</option>
                  <option value={"PARTTIME"}>Part Time</option>
                  <option value={"CASUAL"}>Casual</option>
                  <option value={"LABOURHIRE"}>Labour Hire</option>
                  <option value={"SUPERINCOMESTREAM"}>Super Income Stream</option>
                </select>
                <input
                  type="text"
                  placeholder="employee award classification"
                  value={classification}
                  onChange={(e) => {
                    classificationChangeHandler(e.target.value);
                  }}
                  onBlur={classificationBlurHandler}
                />
              </div>
              <div className={styles.container}>
                <input
                  type="text"
                  placeholder="employee job title"
                  value={jobTitle}
                  onChange={(e) => {
                    jobTitleChangeHandler(e.target.value);
                  }}
                  onBlur={jobTitleBlurHandler}
                />
                <input
                  type="number"
                  placeholder="employee hourly rate"
                  value={rate}
                  onChange={(e) => {
                    rateChangeHandler(e.target.value);
                  }}
                  onBlur={rateBlurHandler}
                />
              </div>
              <label>Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  startDateChangeHandler(e.target.value);
                }}
                onBlur={startDateBlurHandler}
                className={startDateClass}
              />
              <textarea
                className={styles.textarea}
                placeholder="Notes"
                onChange={(e) => {
                  notesChangeHandler(e.target.value);
                }}
                onBlur={notesBlurHandler}
              ></textarea>
              <div className={styles.submitContainer}>
                {" "}
                <BlackButton onClick={submitHandler}>{isLoading ? <i className="fa fa-spinner fa-spin fa-fw"></i> : "SUBMIT"}</BlackButton>
                {invalidInput && <p style={{ color: "red" }}>{invalidInput}</p>}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployerRequest;
