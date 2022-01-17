import styles from "../Page.module.css";
import { useContext, useState, useEffect } from "react";
import DataContext from "../../../context/data-context";
import ReducerContext from "../../../context/reducer-context";
import useValidate from "../../../hooks/useValidate";
import useHttp from "../../../hooks/useHttp";
import BlackButton from "../../Elements/BlackButton";
import InfoCard from "../../Elements/InfoCard";

const Client = (props) => {
  const data_ctx = useContext(DataContext);
  const reducer_ctx = useContext(ReducerContext);
  const info = props.info;

  const { value: company, isValid: companyIsValid, hasError: companyHasError, valueChangeHandler: companyChangeHandler, inputBlurHandler: companyBlurHandler, reset: companyReset } = useValidate((value) => value.trim() !== "");
  const { value: firstName, isValid: firstNameIsValid, hasError: firstNameHasError, valueChangeHandler: firstNameChangeHandler, inputBlurHandler: firstNameBlurHandler, reset: firstNameReset } = useValidate((value) => value.trim() !== "");
  const { value: lastName, isValid: lastNameIsValid, hasError: lastNameHasError, valueChangeHandler: lastNameChangeHandler, inputBlurHandler: lastNameBlurHandler, reset: lastNameReset } = useValidate((value) => value.trim() !== "");
  const { value: email, isValid: emailIsValid, hasError: emailHasError, valueChangeHandler: emailChangeHandler, inputBlurHandler: emailBlurHandler, reset: emailReset } = useValidate((value) => value.trim() !== "");
  const { value: phone, isValid: phoneIsValid, hasError: phoneHasError, valueChangeHandler: phoneChangeHandler, inputBlurHandler: phoneBlurHandler, reset: phoneReset } = useValidate((value) => value.trim() !== "");

  const [invalidInput, setInvalidInput] = useState();

  const companyClass = companyHasError ? "invalid" : "";
  const firstNameClass = firstNameHasError ? "invalid" : "";
  const lastNameClass = lastNameHasError ? "invalid" : "";
  const emailClass = emailHasError ? "invalid" : "";
  const phoneClass = phoneHasError ? "invalid" : "";

  const { isLoading, sendRequest: manageClient } = useHttp();

  useEffect(() => {
    if (info) {
      companyChangeHandler(info["company"]);
      companyBlurHandler();

      firstNameChangeHandler(info["first_name"]);
      firstNameBlurHandler();

      lastNameChangeHandler(info["last_name"]);
      lastNameBlurHandler();

      emailChangeHandler(info["email"]);
      emailBlurHandler();

      phoneChangeHandler(info["phone"]);
      phoneBlurHandler();
    } else {
      companyReset();
      firstNameReset();
      lastNameReset();
      emailReset();
      phoneReset();
    }
  }, [info, data_ctx, companyReset, phoneReset, firstNameReset, lastNameReset, emailReset, companyChangeHandler, companyBlurHandler, phoneBlurHandler, phoneChangeHandler, firstNameChangeHandler, firstNameBlurHandler, lastNameChangeHandler, lastNameBlurHandler, emailChangeHandler, emailBlurHandler]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (companyIsValid && firstNameIsValid && lastNameIsValid && emailIsValid && phoneIsValid) {
      const data = {
        company: company,
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
      };

      if (info) {
        data["_id"] = info["_id"];
      }

      manageClient(
        {
          url: "clients",
          method: "post",
          body: data,
          ai_id: "60473271b7894100829ea766",
        },
        (response) => {

            const client = data_ctx["clients"].data.find((client) => client["_id"] === response.data["_id"]);
            if (!client) {
             
              data_ctx["clients"].set((prev) => {
                return [response.data, ...prev];
              });

            } else {
              data_ctx["clients"].set((prev) => {
                const arr = prev.filter((cli) => cli["_id"] !== client["_id"]);
                return [...arr, response.data];
              });
            }

            reducer_ctx.dispatch({ type: "ILLUSTRATION"});

          companyReset();
          firstNameReset();
          lastNameReset();
          emailReset();
          phoneReset();
        }
      );
    } else {
      setInvalidInput("Please review your submission.");
    }
  };

  let button = (
    <BlackButton className={styles.submit} onClick={submitHandler}>
      submit
    </BlackButton>
  );

  if (isLoading) {
    button = (
      <BlackButton className={styles.submit} disabled={'disabled'}>
        loading <i className="fa fa-spinner fa-spin fa-fw"></i>
      </BlackButton>
    );
  }

  return (
    <>
      {info === "loading" && <i className="fa fa-spinner fa-spin fa-2x fa-fw"></i>}
      {info !== "loading" && (
        <div className={styles.relative}>
          <InfoCard>
            <form className={styles.form}>
              <div >
                {info && <p className={styles.id}>ID: {info["_id"]}</p>}
                <input
                  type="text"
                  placeholder="company name"
                  value={company}
                  onChange={(e) => {
                    setInvalidInput();
                    companyChangeHandler(e.target.value);
                  }}
                  onBlur={companyBlurHandler}
                  className={companyClass}
                />
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
                    onBlur={firstNameBlurHandler}
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
                <div className={styles.container}>
                  {button}
                  <p style={{ color: "red" }}>{invalidInput}</p>
                </div>
              </div>
            </form>
          </InfoCard>
        </div>
      )}
    </>
  );
};

export default Client;
