import styles from "./EmployeeApplication.module.css";
import { useHistory } from "react-router-dom";
import qs from "qs";
import { useEffect, useState } from "react";
import useValidate from "../../hooks/useValidate";
import BlackButton from "../Elements/BlackButton";
import axios from "axios";

const EmployeeApplication = (props) => {
  const history = useHistory();
  const params = qs.parse(history.location.search.split("?")[1]);
  const request_id = params["request"];
  const tenant_id = params["tenant"];
  const token = params["token"];

  const [request, setRequest] = useState();
  const [tenant, setTenant] = useState([]);

  const [invalidInput, setInvalidInput] = useState(false);

  const [secAcc, setSecAcc] = useState(false);
  const [own, setOwn] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [thankyou, setThankyou] = useState(false);

  const { value: title, isValid: titleIsValid, valueChangeHandler: titleChangeHandler, inputBlurHandler: titleBlurHandler, valueClass: titleClass } = useValidate((value) => value !== "");
  const { value: firstName, isValid: firstNameIsValid, valueChangeHandler: firstNameChangeHandler, inputBlurHandler: firstNameBlurHandler, valueClass: firstNameClass } = useValidate((value) => value.trim() !== "");
  const { value: lastName, isValid: lastNameIsValid, valueChangeHandler: lastNameChangeHandler, inputBlurHandler: lastNameBlurHandler, valueClass: lastNameClass } = useValidate((value) => value.trim() !== "");
  const { value: gender, isValid: genderIsValid, valueChangeHandler: genderChangeHandler, inputBlurHandler: genderBlurHandler, valueClass: genderClass } = useValidate((value) => value !== "");
  const { value: dateOfBirth, isValid: dateOfBirthIsValid, valueChangeHandler: dateOfBirthChangeHandler, inputBlurHandler: dateOfBirthBlurHandler, valueClass: dateOfBirthClass } = useValidate((value) => value !== "");
  const { value: email, isValid: emailIsValid, valueChangeHandler: emailChangeHandler, inputBlurHandler: emailBlurHandler, valueClass: emailClass } = useValidate((value) => value !== "" && value.trim().includes("@") && value.trim().includes("."));
  const { value: phone, valueChangeHandler: phoneChangeHandler, inputBlurHandler: phoneBlurHandler } = useValidate((value) => value);
  const { value: address1, isValid: address1IsValid, valueChangeHandler: address1ChangeHandler, inputBlurHandler: address1BlurHandler, valueClass: address1Class } = useValidate((value) => value.trim() !== "");
  const { value: address2, valueChangeHandler: address2ChangeHandler, inputBlurHandler: address2BlurHandler } = useValidate((value) => value);
  const { value: city, isValid: cityIsValid, valueChangeHandler: cityChangeHandler, inputBlurHandler: cityBlurHandler, valueClass: cityClass } = useValidate((value) => value.trim() !== "");
  const { value: state, isValid: stateIsValid, valueChangeHandler: stateChangeHandler, inputBlurHandler: stateBlurHandler, valueClass: stateClass } = useValidate((value) => value !== "");
  const { value: postcode, isValid: postcodeIsValid, valueChangeHandler: postcodeChangeHandler, inputBlurHandler: postcodeBlurHandler, valueClass: postcodeClass } = useValidate((value) => value.trim().length === 4);

  const { value: accName1, isValid: accName1IsValid, valueChangeHandler: accName1ChangeHandler, inputBlurHandler: accName1BlurHandler, valueClass: accName1Class } = useValidate((value) => value.trim() !== "");
  const { value: bsb1, isValid: bsb1IsValid, valueChangeHandler: bsb1ChangeHandler, inputBlurHandler: bsb1BlurHandler, valueClass: bsb1Class } = useValidate((value) => value.trim() !== "" && value.trim().length === 6 && /^\d+$/.test(value.trim()));
  const { value: accNumber1, isValid: accNumber1IsValid, valueChangeHandler: accNumber1ChangeHandler, inputBlurHandler: accNumber1BlurHandler, valueClass: accNumber1Class } = useValidate((value) => value.trim() !== "" && value.trim().length >= 6 && value.trim().length <= 10 && /^\d+$/.test(value));
  const { value: accName2, isValid: accName2IsValid, valueChangeHandler: accName2ChangeHandler, inputBlurHandler: accName2BlurHandler, reset: accName2Reset, valueClass: accName2Class } = useValidate((value) => value.trim() !== "");
  const { value: bsb2, isValid: bsb2IsValid, valueChangeHandler: bsb2ChangeHandler, inputBlurHandler: bsb2BlurHandler, reset: bsb2Reset, valueClass: bsb2Class } = useValidate((value) => value.trim() !== "" && value.trim().length === 6 && /^\d+$/.test(value.trim()));
  const { value: accNumber2, isValid: accNumber2IsValid, valueChangeHandler: accNumber2ChangeHandler, inputBlurHandler: accNumber2BlurHandler, reset: accNumber2Reset, valueClass: accNumber2Class } = useValidate((value) => value.trim() !== "" && value.trim().length >= 6 && value.trim().length <= 10 && /^\d+$/.test(value));
  const { value: fixedAmount, isValid: fixedAmountIsValid, valueChangeHandler: fixedAmountChangeHandler, inputBlurHandler: fixedAmountBlurHandler, reset: fixedAmountReset, valueClass: fixedAmountClass } = useValidate((value) => value.trim() !== "" && value.trim() > 0);

  const { value: tfn, isValid: tfnIsValid, valueChangeHandler: tfnChangeHandler, inputBlurHandler: tfnBlurHandler, valueClass: tfnClass } = useValidate(validateTFN);
  const { value: residency, isValid: residencyIsValid, valueChangeHandler: residencyChangeHandler } = useValidate((value) => value !== "");
  const { value: taxFree, valueChangeHandler: taxFreeChangeHandler } = useValidate((value) => value);
  const { value: help, valueChangeHandler: helpChangeHandler } = useValidate((value) => value);
  const { value: supplement, valueChangeHandler: supplementChangeHandler } = useValidate((value) => value);

  const { value: superFund, isValid: superFundIsValid, valueChangeHandler: superFundChangeHandler, inputBlurHandler: superFundBlurHandler } = useValidate((value) => value);
  const { value: usi, isValid: usiIsValid, valueChangeHandler: usiChangeHandler, inputBlurHandler: usiBlurHandler, reset: usiReset, valueClass: usiClass } = useValidate((value) => value.trim() !== "");
  const { value: employeeNumber, isValid: employeeNumberIsValid, valueChangeHandler: employeeNumberChangeHandler, inputBlurHandler: employeeNumberBlurHandler, reset: employeeNumberReset, valueClass: employeeNumberClass } = useValidate((value) => value.trim() !== "");

  const { value: declaration, isValid: declarationIsValid, valueChangeHandler: declarationChangeHandler } = useValidate((value) => value === true);

  useEffect(() => {
    setIsLoading(true);
    tfnChangeHandler("");
    tfnBlurHandler();

    axios({
      url: "https://eline-api.herokuapp.com/requests/" + request_id,
    }).then((response) => {
      setIsLoading(false);

      if (response.data.status === 200) {
        const req = response.data.data[0];
        setRequest(req);

        firstNameChangeHandler(req["contact"]["first_name"]);
        firstNameBlurHandler();
        lastNameChangeHandler(req["contact"]["last_name"]);
        lastNameBlurHandler();
        emailChangeHandler(req["contact"]["email"]);
        emailBlurHandler();
        phoneChangeHandler(req["contact"]["phone"]);
        phoneBlurHandler();
      } else {
        setRequest(false)
      }
    });
  }, [request_id, tfnChangeHandler, tfnBlurHandler, firstNameChangeHandler, firstNameBlurHandler, lastNameChangeHandler, lastNameBlurHandler, emailChangeHandler, emailBlurHandler, phoneChangeHandler, phoneBlurHandler]);

  useEffect(() => {
    setIsLoading(true);
    axios({
      url: "https://eline-api.herokuapp.com/tenants/" + tenant_id,
    }).then((response) => {
      if (response.data.status === 200) {
        const tenant = response.data.data[0];
        
        if (response.data.status === 200) {
          setTenant(tenant);
        }
      } else {
        setRequest(false)
      }
      setIsLoading(false);
    });
  }, [tenant_id]);

  function validateTFN(value) {
    const weights = [1, 4, 3, 7, 5, 8, 6, 9, 10];
    if (value === "") {
      return true;
    }
    if (value.length === 9) {
      let total = 0;

      weights.forEach((weight) => {
        total += weight * value[weights.indexOf(weight)];
      });

      if (total % 11 === 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  const superHandler = (e) => {
    setInvalidInput();
    setOwn(false);
    employeeNumberReset();
    usiReset();
    superFundChangeHandler(e.target.value);

    if (e.target.value === "u18") {
    }

    if (e.target.value === "own") {
      setOwn(true);
    }
  };

  const addAccount = (e) => {
    e.preventDefault();
    accName2Reset();
    accNumber2Reset();
    bsb2Reset();
    fixedAmountReset();
    setSecAcc((prev) => !prev);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const send = () => {
      setIsLoading(true);
      const data = {
        title,
        firstName,
        lastName,
        dateOfBirth,
        homeAddress: {
          addressLine1: address1,
          addressLine2: address2,
          city,
          region: state,
          postalCode: postcode,
          country: "AUSTRALIA",
        },
        email,
        gender,
        phone,
        status: "ACTIVE",
        jobTitle: request["position"]["job_title"],
        classification: request["position"]["classification"],
        rate: request["position"]["rate"],
        startDate: request["position"]["start_date"],
        taxDeclaration: {
          employmentBasis: request["position"]["employment_basis"],
          tFNExemptionType: tfn === "" ? "NOTQUOTED" : null,
          taxFileNumber: tfn,
          residencyStatus: residency,
          taxFreeThresholdClaimed: taxFree,
          hasHELPDebt: help,
          hasSFSSDebt: supplement,
        },
        bankAccounts: [
          {
            statementText: "Salary",
            accountName: accName1,
            bSB: bsb1,
            accountNumber: accNumber1,
            remainder: true,
          },
        ],
        superMemberships: [
          {
            superFundID: superFund,
            employeeNumber,
            uSI: usi,
          },
        ],

        tenant,
        request,
        token,
      };

      if (secAcc) {
        data["bankAccounts"].push({
          statementText: "Salary",
          accountName: accName2,
          bSB: bsb2,
          accountNumber: accNumber2,
          amount: fixedAmount,
        });
      }

      axios({
        url: "https://eline-api.herokuapp.com/submit-employee",
        method: "POST",
        data: qs.stringify(data),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }).then((response) => {
        setIsLoading(false);
        if (response.data.status === 200) {
          setThankyou(true);
        } else {
          setInvalidInput(response.data.message);
        }
      });
    };

    if (titleIsValid && firstNameIsValid && lastNameIsValid && genderIsValid && dateOfBirthIsValid && emailIsValid && address1IsValid && cityIsValid && stateIsValid && postcodeIsValid && accName1IsValid && bsb1IsValid && accNumber1IsValid && tfnIsValid && residencyIsValid && declarationIsValid && superFundIsValid && (employeeNumberIsValid || superFund === "u18")) {
      let secIsValid = false;
      let ownIsValid = false;
      if (secAcc) {
        if ((accName2IsValid && accNumber2IsValid && bsb2IsValid, fixedAmountIsValid)) {
          secIsValid = true;
        } else {
          setInvalidInput("Please review second bank account details.");
        }
      } else {
        secIsValid = true;
      }
      if (own) {
        if (usiIsValid) {
          ownIsValid = true;
        } else {
          setInvalidInput("Please review your USI number.");
        }
      } else {
        ownIsValid = true;
      }

      if (secIsValid && ownIsValid) {
        send();
      }
    } else {
      setIsLoading(false);
      if (!declarationIsValid) {
        setInvalidInput("Please accept the declaration.");
      }
      if (!employeeNumberIsValid && superFund !== "u18") {
        setInvalidInput("Please add your super employee number");
      }
      if (!superFund) {
        setInvalidInput("Please complete a super fund.");
      }
      if (!bsb1) {
        setInvalidInput("Please review the bsb.");
      }
      if (!accNumber1) {
        setInvalidInput("Please review the account number.");
      }
      if (!accName1) {
        setInvalidInput("Please complete the account name.");
      }
      if (!residencyIsValid) {
        setInvalidInput("Please complete the residency status.");
      }
      if (!tfnIsValid) {
        setInvalidInput("Please review the tax file number.");
      }
      if (!email) {
        setInvalidInput("Please check that email is valid.");
      }
      if (!postcodeIsValid) {
        setInvalidInput("Please complete the postcode.");
      }
      if (!stateIsValid) {
        setInvalidInput("Please select the state.");
      }
      if (!cityIsValid) {
        setInvalidInput("Please complete the suburb.");
      }
      if (!address1IsValid) {
        setInvalidInput("Please complete the address line");
      }
      if (!genderIsValid) {
        setInvalidInput("Please specify your gender.");
      }
      if (!dateOfBirth) {
        setInvalidInput("Please review the date of birth.");
      }
      if (!lastNameIsValid) {
        setInvalidInput("Please complete the last name.");
      }
      if (!firstNameIsValid) {
        setInvalidInput("Please complete the first name.");
      }
      if (!titleIsValid) {
        setInvalidInput("Please selct the title.");
      }
    }
  };

  return (
    <>
      {!request && !isLoading && (
        <div className={styles.loading}>
          <h1>This link has expired...</h1>
        </div>
      )}
      {isLoading ? (
        <div className={styles["loading"]}>
          <i className="fa fa-spinner fa-spin fa-fw"></i>
        </div>
      ) : (
        <div>
          {!thankyou ? (
            <div>
              {tenant && request && (
                <div className={styles.backdrop}>
                  <div className={styles["form-container"]}>
                    <h1>
                      Hello {request["contact"]["first_name"]}, welcome to {request["contact"]["company"]["company"]}!
                    </h1>
                    <p>We just need a few more details to complete your onboarding.</p>
                    <form>
                      <p>Personal:</p>

                      <div className={styles["tripple-input"]}>
                        <select
                          value={title}
                          onChange={(e) => {
                            setInvalidInput();
                            titleChangeHandler(e.target.value);
                          }}
                          onBlur={titleBlurHandler}
                          className={`${titleClass} ${styles.select} ${styles["title-input"]}`}
                        >
                          <option hidden>title</option>
                          <option value="Mr.">Mr</option>
                          <option value="Miss.">Miss</option>
                          <option value="Mrs.">Mrs</option>
                          <option value="Ms.">Ms</option>
                        </select>
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
                      <div className={styles["dual-input"]}>
                        <div className={styles["label-div"]}>
                          <label>Date of Birth:</label>
                          <input
                            type="date"
                            value={dateOfBirth}
                            onChange={(e) => {
                              setInvalidInput();
                              dateOfBirthChangeHandler(e.target.value);
                            }}
                            onBlur={dateOfBirthBlurHandler}
                            className={dateOfBirthClass}
                          />
                        </div>
                        <div className={styles["label-div"]}>
                          <label>Gender:</label>
                          <select
                            value={gender}
                            onChange={(e) => {
                              setInvalidInput();
                              genderChangeHandler(e.target.value);
                            }}
                            onBlur={genderBlurHandler}
                            className={`${genderClass} ${styles.select}`}
                          >
                            <option hidden>gender</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            <option value="I">Rather not specify</option>
                          </select>
                        </div>
                      </div>
                      <p>Address:</p>
                      <input
                        type="text"
                        placeholder="address line 1"
                        value={address1}
                        onChange={(e) => {
                          setInvalidInput();
                          address1ChangeHandler(e.target.value);
                        }}
                        onBlur={address1BlurHandler}
                        className={address1Class}
                      />
                      <input
                        type="text"
                        placeholder="address line 2"
                        value={address2}
                        onChange={(e) => {
                          setInvalidInput();
                          address2ChangeHandler(e.target.value);
                        }}
                        onBlur={address2BlurHandler}
                      />
                      <input
                        type="text"
                        placeholder="suburb"
                        value={city}
                        onChange={(e) => {
                          setInvalidInput();
                          cityChangeHandler(e.target.value);
                        }}
                        onBlur={cityBlurHandler}
                        className={cityClass}
                      />
                      <div className={styles["dual-input"]}>
                        <select
                          value={state}
                          onChange={(e) => {
                            setInvalidInput();
                            stateChangeHandler(e.target.value);
                          }}
                          onBlur={stateBlurHandler}
                          className={`${stateClass} ${styles.select}`}
                        >
                          <option hidden>state</option>
                          <option value="ACT">ACT</option>
                          <option value="NSW">NSW</option>
                          <option value="NT">NT</option>
                          <option value="QLD">QLD</option>
                          <option value="SA">SA</option>
                          <option value="TAS">TAS</option>
                          <option value="VIC">VIC</option>
                          <option value="WA">WA</option>
                        </select>
                        <input
                          type="text"
                          placeholder="post code"
                          value={postcode}
                          onChange={(e) => {
                            setInvalidInput();
                            postcodeChangeHandler(e.target.value);
                          }}
                          onBlur={postcodeBlurHandler}
                          className={postcodeClass}
                        />
                      </div>
                      <p>Contact:</p>
                      <div className={styles["dual-input"]}>
                        <input
                          type="text"
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
                        />
                      </div>
                      <p>Tax Declaration:</p>
                      <input
                        type="text"
                        placeholder="tax file number"
                        value={tfn}
                        onChange={(e) => {
                          setInvalidInput();
                          tfnChangeHandler(e.target.value);
                        }}
                        onBlur={tfnBlurHandler}
                        className={tfnClass}
                      />
                      <select
                        value={residency}
                        onChange={(e) => {
                          setInvalidInput();
                          residencyChangeHandler(e.target.value);
                        }}
                        className={styles.select}
                      >
                        <option hidden>residency</option>
                        <option value="AUSTRALIANRESIDENT">Australian resident</option>
                        <option value="FOREIGNRESIDENT">Foreign Resident</option>
                        <option value="WORKINGHOLIDAYMAKER">Working Holiday Maker</option>
                      </select>

                      <div className={styles.boxes}>
                        <div className={styles["checkbox-container"]}>
                          <input
                            type="checkbox"
                            id="taxFree"
                            value={taxFree}
                            checked={taxFree}
                            onChange={(e) => {
                              setInvalidInput();
                              if (e.target.checked) {
                                taxFreeChangeHandler(true);
                              } else {
                                taxFreeChangeHandler(false);
                              }
                            }}
                          />
                          <label htmlFor="taxFree">Would you like to claim the Tax Free Threshold?</label>
                        </div>
                        <div className={styles["checkbox-container"]}>
                          <input
                            type="checkbox"
                            id="help"
                            value={help}
                            checked={help}
                            onChange={(e) => {
                              setInvalidInput();
                              if (e.target.checked) {
                                helpChangeHandler(true);
                              } else {
                                helpChangeHandler(false);
                              }
                            }}
                          />
                          <label htmlFor="help">Do you have a Higher Education Loan Program (HELP), Student Start-Up Loan (SSL) or Trade Support Loan (TSL) debt?</label>
                        </div>

                        <div className={styles["checkbox-container"]}>
                          <input
                            type="checkbox"
                            id="supplement"
                            value={supplement}
                            checked={supplement}
                            onChange={(e) => {
                              setInvalidInput();
                              if (e.target.checked) {
                                supplementChangeHandler(true);
                              } else {
                                supplementChangeHandler(false);
                              }
                            }}
                          />
                          <label htmlFor="supplement">Do you have financial supplement debt?</label>
                        </div>
                      </div>

                      <p>Bank Details:</p>
                      <input
                        type="text"
                        placeholder="account name"
                        value={accName1}
                        onChange={(e) => {
                          setInvalidInput();
                          accName1ChangeHandler(e.target.value);
                        }}
                        onBlur={accName1BlurHandler}
                        className={accName1Class}
                      />

                      <input
                        type="text"
                        placeholder="bsb"
                        value={bsb1}
                        onChange={(e) => {
                          setInvalidInput();
                          bsb1ChangeHandler(e.target.value);
                        }}
                        onBlur={bsb1BlurHandler}
                        className={bsb1Class}
                      />

                      <input
                        type="text"
                        placeholder="account number"
                        value={accNumber1}
                        onChange={(e) => {
                          setInvalidInput();
                          accNumber1ChangeHandler(e.target.value);
                        }}
                        onBlur={accNumber1BlurHandler}
                        className={accNumber1Class}
                      />

                      {secAcc && (
                        <div>
                          <p>Second Account:</p>
                          <input
                            type="text"
                            placeholder="account name"
                            value={accName2}
                            onChange={(e) => {
                              setInvalidInput();
                              accName2ChangeHandler(e.target.value);
                            }}
                            onBlur={accName2BlurHandler}
                            className={accName2Class}
                          />

                          <input
                            type="text"
                            placeholder="bsb"
                            value={bsb2}
                            onChange={(e) => {
                              setInvalidInput();
                              bsb2ChangeHandler(e.target.value);
                            }}
                            onBlur={bsb2BlurHandler}
                            className={bsb2Class}
                          />

                          <input
                            type="text"
                            placeholder="account number"
                            value={accNumber2}
                            onChange={(e) => {
                              setInvalidInput();
                              accNumber2ChangeHandler(e.target.value);
                            }}
                            onBlur={accNumber2BlurHandler}
                            className={accNumber2Class}
                          />

                          <input
                            type="text"
                            placeholder="fixed amount"
                            value={fixedAmount}
                            onChange={(e) => {
                              setInvalidInput();
                              fixedAmountChangeHandler(e.target.value);
                            }}
                            onBlur={fixedAmountBlurHandler}
                            className={fixedAmountClass}
                          />
                        </div>
                      )}

                      <div className={styles["account-button"]}>
                        <BlackButton onClick={addAccount}>{!secAcc ? "Add another bank Account" : "Remove second account"}</BlackButton>
                      </div>

                      <p>Super Details:</p>
                      <select value={superFund} onChange={superHandler} onBlur={superFundBlurHandler} className={styles.select}>
                        <option hidden>super fund</option>
                        {tenant["superFunds"] &&
                          tenant["superFunds"].map((fund) => {
                            return (
                              <option key={fund["SuperFundID"]} value={fund["SuperFundID"]}>
                                {fund["Name"]}
                              </option>
                            );
                          })}
                        <option value="u18">Under 18 - No Super</option>U<option value="own">Add my own super fund...</option>
                      </select>
                      <input
                        type="text"
                        placeholder="employee number"
                        value={employeeNumber}
                        onChange={(e) => {
                          setInvalidInput();
                          employeeNumberChangeHandler(e.target.value);
                        }}
                        onBlur={employeeNumberBlurHandler}
                        className={employeeNumberClass}
                      />
                      {own && (
                        <div>
                          <input
                            type="text"
                            placeholder="usi"
                            value={usi}
                            onChange={(e) => {
                              setInvalidInput();
                              usiChangeHandler(e.target.value);
                            }}
                            onBlur={usiBlurHandler}
                            className={usiClass}
                          />
                        </div>
                      )}
                      <div className={styles["checkbox-container"]} style={{ margin: "20px 0" }}>
                        <input
                          type="checkbox"
                          id="declaration"
                          value={declaration}
                          onChange={(e) => {
                            setInvalidInput();
                            if (e.target.checked) {
                              declarationChangeHandler(true);
                            } else {
                              declarationChangeHandler(false);
                            }
                          }}
                        />
                        <label htmlFor="declaration">I declare that the information entered is correct and complete to the best of my knowledge.</label>
                      </div>
                      <div className={styles["submit-container"]}>
                        <BlackButton onClick={submitHandler}>{isLoading ? <i className="fa fa-spinner fa-spin fa-fw"></i> : "SUBMIT"}</BlackButton>
                        {invalidInput && (
                          <div className={styles["error-container"]}>
                            <p>{invalidInput}</p>
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className={styles["thanks-container"]}>
              <h1>Thank you.</h1>
              <h2>Your submission has been received.</h2>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default EmployeeApplication;
