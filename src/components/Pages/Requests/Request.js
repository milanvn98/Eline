import styles from "../Page.module.css";
import { useContext, useEffect, useState } from "react";
import DataContext from "../../../context/data-context";
import ReducerContext from "../../../context/reducer-context";
import useValidate from "../../../hooks/useValidate";
import useHttp from "../../../hooks/useHttp";
import InfoCard from "../../Elements/InfoCard";
import BlackButton from "../../Elements/BlackButton";

const Request = (props) => {
  const data_ctx = useContext(DataContext);
  const reducer_ctx = useContext(ReducerContext);
  const info = props.info;

  const { value: company, isValid: companyIsValid, hasError: companyHasError, valueChangeHandler: companyChangeHandler, inputBlurHandler: companyBlurHandler, reset: companyReset } = useValidate((value) => value !== "");
  const { value: firstName, isValid: firstNameIsValid, hasError: firstNameHasError, valueChangeHandler: firstNameChangeHandler, inputBlurHandler: firstNameBlurHandler, reset: firstNameReset } = useValidate((value) => value.trim() !== "");
  const { value: lastName, isValid: lastNameIsValid, hasError: lastNameHasError, valueChangeHandler: lastNameChangeHandler, inputBlurHandler: lastNameBlurHandler, reset: lastNameReset } = useValidate((value) => value.trim() !== "");
  const { value: email, isValid: emailIsValid, hasError: emailHasError, valueChangeHandler: emailChangeHandler, inputBlurHandler: emailBlurHandler, reset: emailReset } = useValidate((value) => value !== "" && value.trim().includes("@") && value.trim().includes("."));
  const { value: phone, isValid: phoneIsValid, hasError: phoneHasError, valueChangeHandler: phoneChangeHandler, inputBlurHandler: phoneBlurHandler, reset: phoneReset } = useValidate((value) => true);
  const { value: employmentBasis, isValid: employmentBasisIsValid, hasError: employmentBasisHasError, valueChangeHandler: employmentBasisChangeHandler, inputBlurHandler: employmentBasisBlurHandler, reset: employmentBasisReset } = useValidate((value) => value.trim() !== "");
  const { value: jobTitle, isValid: jobTitleIsValid, hasError: jobTitleHasError, valueChangeHandler: jobTitleChangeHandler, inputBlurHandler: jobTitleBlurHandler, reset: jobTitleReset } = useValidate((value) => true);
  const { value: rate, isValid: rateIsValid, hasError: rateHasError, valueChangeHandler: rateChangeHandler, inputBlurHandler: rateBlurHandler, reset: rateReset } = useValidate((value) => true);
  const { value: startDate, isValid: startDateIsValid, hasError: startDateHasError, valueChangeHandler: startDateChangeHandler, inputBlurHandler: startDateBlurHandler, reset: startDateReset } = useValidate((value) => value !== "");
  const { value: classification, isValid: classificationIsValid, hasError: classificationHasError, valueChangeHandler: classificationChangeHandler, inputBlurHandler: classificationBlurHandler, reset: classificationReset } = useValidate((value) => value.trim() !== "");
  const { value: notes, isValid: notesIsValid, hasError: notesHasError, valueChangeHandler: notesChangeHandler, inputBlurHandler: notesBlurHandler, reset: notesReset } = useValidate((value) => true);

  const [invalidInput, setInvalidInput] = useState();

  const companyClass = companyHasError ? "invalid" : "";
  const firstNameClass = firstNameHasError ? "invalid" : "";
  const lastNameClass = lastNameHasError ? "invalid" : "";
  const emailClass = emailHasError ? "invalid" : "";
  const phoneClass = phoneHasError ? "invalid" : "";
  const employmentBasisClass = employmentBasisHasError ? "invalid" : "";
  const jobTitleClass = jobTitleHasError ? "invalid" : "";
  const rateClass = rateHasError ? "invalid" : "";
  const startDateClass = startDateHasError ? "invalid" : "";
  const classificationClass = classificationHasError ? "invalid" : "";
  const notesClass = notesHasError ? styles.textarea + " invalid" : styles.textarea;

  const { isLoading, sendRequest: manageRequest } = useHttp();

  useEffect(() => {
    if (info) {
      companyChangeHandler(info["contact"]["company"]["_id"]);
      companyBlurHandler();

      firstNameChangeHandler(info["contact"]["first_name"]);
      firstNameBlurHandler();

      lastNameChangeHandler(info["contact"]["last_name"]);
      lastNameBlurHandler();

      emailChangeHandler(info["contact"]["email"]);
      emailBlurHandler();

      phoneChangeHandler(info["contact"]["phone"]);
      phoneBlurHandler();

      employmentBasisChangeHandler(info["position"]["employment_basis"]);
      employmentBasisBlurHandler();

      jobTitleChangeHandler(info["position"]["job_title"]);
      jobTitleBlurHandler();

      rateChangeHandler(info["position"]["rate"]);
      rateBlurHandler();

      var today = new Date(info["position"]["start_date"]);
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      today = yyyy + "-" + mm + "-" + dd;

      startDateChangeHandler(today);
      startDateBlurHandler();

      classificationChangeHandler(info["position"]["classification"]);
      classificationBlurHandler();

      notesChangeHandler(info["position"]["notes"]);
      notesBlurHandler();
    } else {
      companyReset();
      firstNameReset();
      lastNameReset();
      emailReset();
      phoneReset();
      employmentBasisReset();
      jobTitleReset();
      rateReset();
      startDateReset();
      classificationReset();
      notesReset();
    }
  }, [info, companyChangeHandler, companyBlurHandler, companyReset, firstNameChangeHandler, firstNameBlurHandler, firstNameReset, lastNameChangeHandler, lastNameBlurHandler, lastNameReset, emailChangeHandler, emailBlurHandler, emailReset, phoneChangeHandler, phoneBlurHandler, phoneReset, employmentBasisChangeHandler, employmentBasisBlurHandler, employmentBasisReset, jobTitleChangeHandler, jobTitleBlurHandler, jobTitleReset, rateChangeHandler, rateBlurHandler, rateReset, startDateChangeHandler, startDateBlurHandler, startDateReset, classificationChangeHandler, classificationBlurHandler, classificationReset, notesChangeHandler, notesBlurHandler, notesReset]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (companyIsValid && firstNameIsValid && lastNameIsValid && emailIsValid && phoneIsValid && employmentBasisIsValid && jobTitleIsValid && rateIsValid && startDateIsValid && classificationIsValid && notesIsValid) {
      const client = data_ctx["clients"]["data"].find((client) => client["_id"] === company);

      const data = {
        contact: {
          company: { _id: client["_id"], company: client["company"] },
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone,
        },
        position: {
          job_title: jobTitle,
          start_date: new Date(startDate),
          classification: classification,
          employment_basis: employmentBasis,
          rate: rate,
          notes: notes,
        },
        status: info ? info["status"] : "authorise",
      };

      if (info) {
        data["_id"] = info["_id"];
      }

      manageRequest(
        {
          url: "requests",
          method: "post",
          body: data,
          ai_id: "60473271b7894100829ea766",
        },
        (response) => {
          const request = data_ctx["requests"].data.find((request) => request["_id"] === response.data["_id"]);
          if (!request) {
            data_ctx["requests"].set((prev) => {
              return [response.data, ...prev];
            });
          } else {
            data_ctx["requests"].set((prev) => {
              const arr = prev.filter((req) => req["_id"] !== request["_id"]);
              return [...arr, response.data];
            });
          }

          reducer_ctx.dispatch({ type: "LOADING" });
          reducer_ctx.dispatch({ type: "REQUEST_INFO", data: response.data });
        }
      );
    } else {
      if (!company) {
        setInvalidInput("Please select the company.");
      }
      if (!firstNameIsValid) {
        setInvalidInput("Please complete the first name.");
      }
      if (!lastNameIsValid) {
        setInvalidInput("Please complete the last name.");
      }
      if (!emailIsValid) {
        setInvalidInput("Please enter a valid email address.");
      }
      if (!employmentBasisIsValid) {
        setInvalidInput("Please select an employment basis.");
      }
      if (!startDateIsValid) {
        setInvalidInput("Please complete the start date.");
      }
      if (!classificationIsValid) {
        setInvalidInput("Please complete the award classification.");
      }
    }
  };

  return (
    <>
      {info === "loading" && <i className="fa fa-spinner fa-spin fa-2x fa-fw"></i>}
      {info !== "loading" && (
        <div className={styles.relative}>
          <InfoCard>
            <form className={styles.form}>
              {info && <p className={styles.id}>ID: {info["_id"]}</p>}
              <div className={styles.container}>
                <div className={styles["form-input-container"]}>
                  <select
                    value={company}
                    onChange={(e) => {
                      setInvalidInput();
                      companyChangeHandler(e.target.value);
                    }}
                    onBlur={companyBlurHandler}
                    className={`${companyClass} ${styles.select}`}
                  >
                    <option hidden>company</option>
                    {data_ctx["clients"]["data"].map((client) => {
                      return (
                        <option key={client["_id"]} value={client["_id"]}>
                          {client["company"]}
                        </option>
                      );
                    })}
                  </select>
                  <div className={styles.container}>
                    <input
                      type="text"
                      placeholder="first name"
                      value={firstName}
                      onChange={(e) => {
                        setInvalidInput();
                        firstNameChangeHandler(e.target.value);
                      }}
                      onBlur={firstNameBlurHandler}
                      className={firstNameClass}
                    />
                    <input
                      type="text"
                      placeholder="last name"
                      value={lastName}
                      onChange={(e) => {
                        setInvalidInput();
                        lastNameChangeHandler(e.target.value);
                      }}
                      onBlur={lastNameBlurHandler}
                      className={lastNameClass}
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => {
                      setInvalidInput();
                      emailChangeHandler(e.target.value);
                    }}
                    onBlur={emailBlurHandler}
                    className={emailClass}
                  />
                  <input
                    type="text"
                    placeholder="phone"
                    value={phone}
                    onChange={(e) => {
                      setInvalidInput();
                      phoneChangeHandler(e.target.value);
                    }}
                    onBlur={phoneBlurHandler}
                    className={phoneClass}
                  />
                </div>
                <div className={styles["form-input-container"]}>
                  <select
                    value={employmentBasis}
                    onChange={(e) => {
                      setInvalidInput();
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
                  <div className={styles.container}>
                    <p style={{ whiteSpace: "nowrap", marginRight: "10px" }}>Start Date:</p>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => {
                        setInvalidInput();
                        startDateChangeHandler(e.target.value);
                      }}
                      onBlur={startDateBlurHandler}
                      className={startDateClass}
                    />
                  </div>
                  <div className={styles.container}>
                    <input
                      type="text"
                      placeholder="job title"
                      value={jobTitle}
                      onChange={(e) => {
                        setInvalidInput();
                        jobTitleChangeHandler(e.target.value);
                      }}
                      onBlur={jobTitleBlurHandler}
                      className={jobTitleClass}
                    />
                    <input
                      type="number"
                      placeholder="hourly rate"
                      value={rate}
                      onChange={(e) => {
                        setInvalidInput();
                        rateChangeHandler(e.target.value);
                      }}
                      onBlur={rateBlurHandler}
                      className={rateClass}
                    />
                  </div>
                  <div className={styles.container}>
                    <p
                      onClick={() => {
                        window.open("https://www.fairwork.gov.au/awards-and-agreements/awards/list-of-awards", "_blank");
                      }}
                      className={styles.award}
                    >
                      Find Classification
                    </p>
                    <input
                      type="text"
                      placeholder="classification"
                      value={classification}
                      onChange={(e) => {
                        setInvalidInput();
                        classificationChangeHandler(e.target.value);
                      }}
                      onBlur={classificationBlurHandler}
                      className={classificationClass}
                    />
                  </div>
                </div>
              </div>
              <textarea
                placeholder="notes"
                value={notes}
                onChange={(e) => {
                  setInvalidInput();
                  notesChangeHandler(e.target.value);
                }}
                onBlur={notesBlurHandler}
                className={notesClass}
              />
              <div className={styles["submit-container"]}>
                <BlackButton onClick={submitHandler} disabled={isLoading && 'disabled'}>{isLoading ? <i className="fa fa-spinner fa-spin fa-fw"></i> : "SUBMIT"}</BlackButton>
                <p style={{ color: "red" }}>{invalidInput}</p>
              </div>
            </form>
          </InfoCard>
        </div>
      )}
    </>
  );
};

export default Request;
