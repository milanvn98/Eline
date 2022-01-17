import styles from "../Page.module.css";
import DataContext from "../../../context/data-context";
import ReducerContext from "../../../context/reducer-context";
import { useState, useEffect, useContext } from "react";
import useHttp from "../../../hooks/useHttp";
import useValidate from "../../../hooks/useValidate";
import InfoCard from "../../Elements/InfoCard";
import BlackButton from "../../Elements/BlackButton";

const Applications = (props) => {
  const data_ctx = useContext(DataContext);
  const reducer_ctx = useContext(ReducerContext);
  const info = props.info;

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

  const { value: company, isValid: companyIsValid, valueChangeHandler: companyChangeHandler, inputBlurHandler: companyBlurHandler, reset: companyReset, valueClass: companyClass } = useValidate((value) => value);
  const { value: title, isValid: titleIsValid, valueChangeHandler: titleChangeHandler, inputBlurHandler: titleBlurHandler, reset: titleReset, valueClass: titleClass } = useValidate((value) => value);
  const { value: firstName, isValid: firstNameIsValid, valueChangeHandler: firstNameChangeHandler, inputBlurHandler: firstNameBlurHandler, reset: firstNameReset, valueClass: firstNameClass } = useValidate((value) => value);
  const { value: lastName, isValid: lastNameIsValid, valueChangeHandler: lastNameChangeHandler, inputBlurHandler: lastNameBlurHandler, reset: lastNameReset, valueClass: lastNameClass } = useValidate((value) => value);
  const { value: gender, isValid: genderIsValid, valueChangeHandler: genderChangeHandler, inputBlurHandler: genderBlurHandler, reset: genderReset, valueClass: genderClass } = useValidate((value) => value);
  const { value: dateOfBirth, isValid: dateOfBirthIsValid, valueChangeHandler: dateOfBirthChangeHandler, inputBlurHandler: dateOfBirthBlurHandler, reset: dateOfBirthReset, valueClass: dateOfBirthClass } = useValidate((value) => value);
  const { value: email, isValid: emailIsValid, valueChangeHandler: emailChangeHandler, inputBlurHandler: emailBlurHandler, reset: emailReset, valueClass: emailClass } = useValidate((value) => value);
  const { value: phone, valueChangeHandler: phoneChangeHandler, inputBlurHandler: phoneBlurHandler, reset: phoneReset, valueClass: phoneClass } = useValidate((value) => true);
  const { value: address1, isValid: address1IsValid, valueChangeHandler: address1ChangeHandler, inputBlurHandler: address1BlurHandler, reset: address1Reset, valueClass: address1Class } = useValidate((value) => value);
  const { value: address2, valueChangeHandler: address2ChangeHandler, inputBlurHandler: address2BlurHandler, reset: address2Reset, valueClass: address2Class } = useValidate((value) => true);
  const { value: city, isValid: cityIsValid, valueChangeHandler: cityChangeHandler, inputBlurHandler: cityBlurHandler, reset: cityReset, valueClass: cityClass } = useValidate((value) => value);
  const { value: state, isValid: stateIsValid, valueChangeHandler: stateChangeHandler, inputBlurHandler: stateBlurHandler, reset: stateReset, valueClass: stateClass } = useValidate((value) => value);
  const { value: postcode, isValid: postcodeIsValid, valueChangeHandler: postcodeChangeHandler, inputBlurHandler: postcodeBlurHandler, reset: postcodeReset, valueClass: postcodeClass } = useValidate((value) => value);

  const { value: employmentBasis, isValid: employmentBasisIsValid, valueChangeHandler: employmentBasisChangeHandler, inputBlurHandler: employmentBasisBlurHandler, reset: employmentBasisReset, valueClass: employmentBasisClass } = useValidate((value) => value);
  const { value: jobTitle, valueChangeHandler: jobTitleChangeHandler, inputBlurHandler: jobTitleBlurHandler, reset: jobTitleReset, valueClass: jobTitleClass } = useValidate((value) => value);
  const { value: rate, valueChangeHandler: rateChangeHandler, inputBlurHandler: rateBlurHandler, reset: rateReset } = useValidate((value) => value);
  const { value: startDate, valueChangeHandler: startDateChangeHandler, inputBlurHandler: startDateBlurHandler, reset: startDateReset, startDateClass } = useValidate((value) => value);
  const { value: classification, isValid: classificationIsValid, valueChangeHandler: classificationChangeHandler, inputBlurHandler: classificationBlurHandler, reset: classificationReset, valueClass: classificationClass } = useValidate((value) => value);

  const { value: accName1, isValid: accName1IsValid, valueChangeHandler: accName1ChangeHandler, inputBlurHandler: accName1BlurHandler, reset: accName1Reset, valueClass: accName1Class } = useValidate((value) => value);
  const { value: bsb1, isValid: bsb1IsValid, valueChangeHandler: bsb1ChangeHandler, inputBlurHandler: bsb1BlurHandler, reset: bsb1Reset, valueClass: bsb1Class } = useValidate((value) => value);
  const { value: accNumber1, isValid: accNumber1IsValid, valueChangeHandler: accNumber1ChangeHandler, inputBlurHandler: accNumber1BlurHandler, reset: accNumber1Reset, valueClass: accNumber1Class } = useValidate((value) => value);
  const { value: accName2, valueChangeHandler: accName2ChangeHandler, inputBlurHandler: accName2BlurHandler, reset: accName2Reset, valueClass: accName2Class } = useValidate((value) => value);
  const { value: bsb2, valueChangeHandler: bsb2ChangeHandler, inputBlurHandler: bsb2BlurHandler, reset: bsb2Reset, valueClass: bsb2Class } = useValidate((value) => value);
  const { value: accNumber2, valueChangeHandler: accNumber2ChangeHandler, inputBlurHandler: accNumber2BlurHandler, reset: accNumber2Reset, valueClass: accNumber2Class } = useValidate((value) => value);
  const { value: fixedAmount, valueChangeHandler: fixedAmountChangeHandler, inputBlurHandler: fixedAmountBlurHandler, reset: fixedAmountReset, valueClass: fixedAmountClass } = useValidate((value) => value);

  const { value: tfn, isValid: tfnIsValid, valueChangeHandler: tfnChangeHandler, inputBlurHandler: tfnBlurHandler, reset: tfnReset, valueClass: tfnClass } = useValidate(validateTFN);
  const { value: noTfn, valueChangeHandler: noTfnChangeHandler, inputBlurHandler: noTfnBlurHandler, reset: noTfnReset } = useValidate((value) => value);
  const { value: residency, isValid: residencyIsValid, valueChangeHandler: residencyChangeHandler, inputBlurHandler: residencyBlurHandler, reset: residencyReset, valueClass: residencyClass } = useValidate((value) => value);
  const { value: taxFree, isValid: taxFreeIsValid, valueChangeHandler: taxFreeChangeHandler, inputBlurHandler: taxFreeBlurHandler, reset: taxFreeReset } = useValidate((value) => value);
  const { value: help, valueChangeHandler: helpChangeHandler, inputBlurHandler: helpBlurHandler, reset: helpReset } = useValidate((value) => value);
  const { value: supplement, valueChangeHandler: supplementChangeHandler, inputBlurHandler: supplementBlurHandler, reset: supplementReset } = useValidate((value) => value);

  const { value: superFund, valueChangeHandler: superFundChangeHandler, inputBlurHandler: superFundBlurHandler, reset: superFundReset } = useValidate((value) => value);
  const { value: usi, valueChangeHandler: usiChangeHandler, inputBlurHandler: usiBlurHandler, reset: usiReset } = useValidate((value) => value);
  const { value: employeeNumber, valueChangeHandler: employeeNumberChangeHandler, inputBlurHandler: employeeNumberBlurHandler, reset: employeeNumberReset } = useValidate((value) => value);

  const { value: declaration, valueChangeHandler: declarationChangeHandler, inputBlurHandler: declarationBlurHandler, reset: declarationReset } = useValidate((value) => value);

  const [invalidInput, setInvalidInput] = useState();

  const { isLoading, sendRequest: manageApplication } = useHttp();

  useEffect(() => {
    noTfnChangeHandler("NOTQUOTED");
    taxFreeChangeHandler(false);
    helpChangeHandler(false);
    supplementChangeHandler(false);
    declarationChangeHandler(false);

    if (info) {
      companyChangeHandler(info["company"]);
      companyBlurHandler();
      titleChangeHandler(info["title"]);
      titleBlurHandler();
      firstNameChangeHandler(info["firstName"]);
      firstNameBlurHandler();
      lastNameChangeHandler(info["lastName"]);
      lastNameBlurHandler();
      genderChangeHandler(info["gender"]);
      genderBlurHandler();
      dateOfBirthChangeHandler(info["dateOfBirth"]);
      dateOfBirthBlurHandler();
      emailChangeHandler(info["email"]);
      emailBlurHandler();
      phoneChangeHandler(info["phone"]);
      phoneBlurHandler();
      address1ChangeHandler(info["homeAddress"]["addressLine1"]);
      address1BlurHandler();
      info["homeAddress"]["addressLine2"] !== "" && address2ChangeHandler(info["homeAddress"]["addressLine2"]);
      info["homeAddress"]["addressLine2"] !== "" && address2BlurHandler();
      cityChangeHandler(info["homeAddress"]["city"]);
      cityBlurHandler();
      stateChangeHandler(info["homeAddress"]["region"]);
      stateBlurHandler();
      postcodeChangeHandler(info["homeAddress"]["postalCode"]);
      postcodeBlurHandler();

      employmentBasisChangeHandler(info["taxDeclaration"]["employmentBasis"]);
      employmentBasisBlurHandler();
      jobTitleChangeHandler(info["jobTitle"]);
      jobTitleBlurHandler();
      info["rate"] && rateChangeHandler(info["rate"]);
      info["rate"] && rateBlurHandler();

      var today = new Date(info["startDate"]);
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      today = yyyy + "-" + mm + "-" + dd;

      startDateChangeHandler(today);
      startDateBlurHandler();
      classificationChangeHandler(info["classification"]);
      classificationBlurHandler();

      accName1ChangeHandler(info["bankAccounts"][0]["accountName"]);
      accName1BlurHandler();
      bsb1ChangeHandler(info["bankAccounts"][0]["bSB"]);
      bsb1BlurHandler();
      accNumber1ChangeHandler(info["bankAccounts"][0]["accountNumber"]);
      accNumber1BlurHandler();

      if (info["bankAccounts"][1]) {
        accName2ChangeHandler(info["bankAccounts"][1]["accountName"]);
        accName2BlurHandler();
        bsb2ChangeHandler(info["bankAccounts"][1]["bSB"]);
        bsb2BlurHandler();
        accNumber2ChangeHandler(info["bankAccounts"][1]["accountNumber"]);
        accNumber2BlurHandler();
        fixedAmountChangeHandler(info["bankAccounts"][1]["amount"]);
        fixedAmountBlurHandler();
      }

      tfnChangeHandler(info["taxDeclaration"]["taxFileNumber"]);
      tfnBlurHandler();
      residencyChangeHandler(info["taxDeclaration"]["residencyStatus"]);
      residencyBlurHandler();

      if (info["taxDeclaration"]["tFNExemptionType"] === "NOTQUOTED") {
        noTfnChangeHandler("NOTQUOTED");
      } else {
        noTfnChangeHandler(false);
      }

      if (info["taxDeclaration"]["taxFreeThresholdClaimed"] === "true") {
        taxFreeChangeHandler(true);
      } else {
        taxFreeChangeHandler(false);
      }

      if (info["taxDeclaration"]["hasHELPDebt"] === "true") {
        helpChangeHandler(true);
      } else {
        helpChangeHandler(false);
      }

      if (info["taxDeclaration"]["hasSFSSDebt"] === "true") {
        supplementChangeHandler(true);
      } else {
        supplementChangeHandler(false);
      }

      info["superMemberships"][0] && superFundChangeHandler(info["superMemberships"][0]["superFundID"]);

      info["superMemberships"][0] && usiChangeHandler(info["superMemberships"][0]["uSI"]);

      info["superMemberships"][0] && employeeNumberChangeHandler(info["superMemberships"][0]["employeeNumber"]);
    } else {
      companyReset();
      titleReset();
      firstNameReset();
      lastNameReset();
      genderReset();
      dateOfBirthReset();
      emailReset();
      phoneReset();
      address1Reset();
      address2Reset();
      cityReset();
      stateReset();
      postcodeReset();
      employmentBasisReset();
      rateReset();
      jobTitleReset();
      startDateReset();
      classificationReset();
      accName1Reset();
      bsb2Reset();
      accNumber1Reset();
      accName2Reset();
      bsb2Reset();
      accNumber2Reset();
      fixedAmountReset();
      tfnReset();
      noTfnReset();
      residencyReset();
      taxFreeReset();
      helpReset();
      supplementReset();
      superFundReset();
      usiReset();
      employeeNumberReset();
    }
  }, [
    info,
    companyChangeHandler,
    companyBlurHandler,
    companyReset,
    titleChangeHandler,
    titleBlurHandler,
    titleReset,
    firstNameChangeHandler,
    firstNameBlurHandler,
    firstNameReset,
    lastNameChangeHandler,
    lastNameBlurHandler,
    lastNameReset,
    genderChangeHandler,
    genderBlurHandler,
    genderReset,
    dateOfBirthChangeHandler,
    dateOfBirthBlurHandler,
    dateOfBirthReset,
    emailChangeHandler,
    emailBlurHandler,
    emailReset,
    phoneChangeHandler,
    phoneBlurHandler,
    phoneReset,
    address1ChangeHandler,
    address1BlurHandler,
    address1Reset,
    address2ChangeHandler,
    address2BlurHandler,
    address2Reset,
    cityChangeHandler,
    cityBlurHandler,
    cityReset,
    stateChangeHandler,
    stateBlurHandler,
    stateReset,
    postcodeChangeHandler,
    postcodeBlurHandler,
    postcodeReset,
    employmentBasisChangeHandler,
    employmentBasisBlurHandler,
    employmentBasisReset,
    rateChangeHandler,
    rateBlurHandler,
    rateReset,
    startDateChangeHandler,
    startDateBlurHandler,
    startDateReset,
    classificationChangeHandler,
    classificationBlurHandler,
    classificationReset,
    jobTitleChangeHandler,
    jobTitleBlurHandler,
    jobTitleReset,
    tfnChangeHandler,
    tfnBlurHandler,
    tfnReset,
    noTfnChangeHandler,
    noTfnBlurHandler,
    noTfnReset,
    residencyChangeHandler,
    residencyBlurHandler,
    residencyReset,
    accName1ChangeHandler,
    accName1BlurHandler,
    accName1Reset,
    bsb1ChangeHandler,
    bsb1BlurHandler,
    bsb1Reset,
    accNumber1ChangeHandler,
    accNumber1BlurHandler,
    accNumber1Reset,
    accName2ChangeHandler,
    accName2BlurHandler,
    accName2Reset,
    bsb2ChangeHandler,
    bsb2BlurHandler,
    bsb2Reset,
    accNumber2ChangeHandler,
    accNumber2BlurHandler,
    accNumber2Reset,
    fixedAmountChangeHandler,
    fixedAmountBlurHandler,
    fixedAmountReset,
    taxFreeChangeHandler,
    taxFreeBlurHandler,
    taxFreeReset,
    helpChangeHandler,
    helpBlurHandler,
    helpReset,
    supplementChangeHandler,
    supplementBlurHandler,
    supplementReset,
    superFundChangeHandler,
    superFundBlurHandler,
    superFundReset,
    usiChangeHandler,
    usiBlurHandler,
    usiReset,
    employeeNumberChangeHandler,
    employeeNumberBlurHandler,
    employeeNumberReset,
    declarationChangeHandler,
    declarationBlurHandler,
    declarationReset,
  ]);

  const submitHandler = (e) => {
    setInvalidInput();
    e.preventDefault();

    if (companyIsValid && titleIsValid && firstNameIsValid && lastNameIsValid && dateOfBirthIsValid && emailIsValid && genderIsValid && address1IsValid && cityIsValid && stateIsValid && postcodeIsValid && employmentBasisIsValid && classificationIsValid && accName1IsValid && bsb1IsValid && accNumber1IsValid && tfnIsValid && residencyIsValid) {
      const data = {
        company,
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
        jobTitle,
        classification,
        rate,
        startDate: startDate,
        taxDeclaration: {
          employmentBasis,
          tFNExemptionType: noTfn,
          taxFileNumber: tfn,
          residencyStatus: residency,
          taxFreeThresholdClaimed: taxFreeIsValid,
          hasHELPDebt: help,
          hasSFSSDebt: supplement,
        },
        bankAccounts: [
          {
            statementText: "SALARY",
            accountName: accName1,
            bSB: bsb1,
            accountNumber: accNumber1,
          },
        ],
        superMemberships: [
          {
            superFundID: superFund,
            employeeNumber,
            usi: usi,
          },
        ],
        request: "",
        token: "",
        tenant: "",
        error: "",
        superfund: "",
      };

      if (accName2 && accNumber2 && bsb2) {
        data["bankAccounts"].push({
          statementText: "SALARY",
          accountName: accName2,
          bSB: bsb2,
          accountNumber: accNumber2,
          remainder: true,
          amount: fixedAmount,
        });
      }

      if (info) {
        data["_id"] = info["_id"];
      }

      manageApplication(
        {
          url: "applications",
          method: "post",
          body: data,
          ai_id: "60473271b7894100829ea766",
        },
        (response) => {
          const application = data_ctx["applications"].data.find((app) => app["_id"] === response.data["_id"]);

          if (!application) {
            data_ctx["applications"].set((prev) => {
              return [response.data, ...prev];
            });
          } else {
            data_ctx["applications"].set((prev) => {
              const arr = prev.filter((app) => app["_id"] !== application["_id"]);
              return [...arr, response.data];
            });
          }

          reducer_ctx.dispatch({ type: "LOADING" });
          reducer_ctx.dispatch({ type: "APPLICATION_INFO", data: response.data });

          //Reset
        }
      );
    } else {
      if (!companyIsValid) {
        setInvalidInput("Please select a company connection.");
      }
      if (!titleIsValid) {
        setInvalidInput("Please selct the title.");
      }

      if (!firstNameIsValid) {
        setInvalidInput("Please complete the first name.");
      }
      if (!lastNameIsValid) {
        setInvalidInput("Please complete the last name.");
      }
      if (!dateOfBirth) {
        setInvalidInput("Please review the date of birth.");
      }
      if (!firstNameIsValid) {
        setInvalidInput("Please complete the first name.");
      }
      if (!address1IsValid) {
        setInvalidInput("Please complete the address line");
      }
      if (!cityIsValid) {
        setInvalidInput("Please complete the city.");
      }
      if (!postcodeIsValid) {
        setInvalidInput("Please complete the postcode.");
      }
      if (!email) {
        setInvalidInput("Please fill check that email is valid.");
      }
      if (!classificationIsValid) {
        setInvalidInput("Please complete the employee classification.");
      }
      if (!employmentBasisIsValid) {
        setInvalidInput("Please select an employment type.");
      }
      if (!tfnIsValid) {
        setInvalidInput("Please review the tax file number.");
      }

      if (!residencyIsValid) {
        setInvalidInput("Please complete the residency status.");
      }
      if (!accName1) {
        setInvalidInput("Please complete the account name.");
      }
      if (!accNumber1) {
        setInvalidInput("Please review the account number.");
      }
      if (!bsb1) {
        setInvalidInput("Please review the bsb.");
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
              <div className={styles["form-container"]}>
                <div className={styles["form-input-container"]}>
                  {info && <p className={styles.id}>ID: {info["_id"]}</p>}
                  <p>Personal:</p>
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
                  </div>
                  <div className={styles.container}>
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
                  <p>Date of Birth:</p>
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
                    className={address2Class}
                  />
                  <input
                    type="text"
                    placeholder="city"
                    value={city}
                    onChange={(e) => {
                      setInvalidInput();
                      cityChangeHandler(e.target.value);
                    }}
                    onBlur={cityBlurHandler}
                    className={cityClass}
                  />
                  <div className={styles.container}>
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
                    className={phoneClass}
                  />
                  <p>Super Details:</p>
                  <input
                    type="text"
                    placeholder="super"
                    value={superFund}
                    onChange={(e) => {
                      setInvalidInput();
                      superFundChangeHandler(e.target.value);
                    }}
                    onBlur={superFundBlurHandler}
                  />
                  <input
                    type="text"
                    placeholder="employee number"
                    value={employeeNumber}
                    onChange={(e) => {
                      setInvalidInput();
                      employeeNumberChangeHandler(e.target.value);
                    }}
                    onBlur={employeeNumberBlurHandler}
                  />
                  <input
                    type="text"
                    placeholder="usi"
                    value={usi}
                    onChange={(e) => {
                      setInvalidInput();
                      usiChangeHandler(e.target.value);
                    }}
                    onBlur={usiBlurHandler}
                  />
                  {/* <div className={styles["checkbox-container"]}>
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
                      onBlur={declarationBlurHandler}
                    />
                    <label htmlFor="declaration">I declare that the information entered is correct and complete to the best of my knowledge.</label>
                  </div> */}
                </div>
                <div className={styles["form-input-container"]}>
                  <p>Position:</p>
                  <div className={styles.container}>
                    <select
                      value={employmentBasis}
                      onChange={(e) => {
                        setInvalidInput();
                        employmentBasisChangeHandler(e.target.value);
                      }}
                      onBlur={employmentBasisBlurHandler}
                      className={`${employmentBasisClass} ${styles.select}`}
                    >
                      <option hidden>type</option>
                      <option value={"FULLTIME"}>Full Time</option>
                      <option value={"PARTTIME"}>Part Time</option>
                      <option value={"CASUAL"}>Casual</option>
                      <option value={"LABOURHIRE"}>Labour Hire</option>
                      <option value={"SUPERINCOMESTREAM"}>Super Income Stream</option>
                    </select>
                    <select
                      value={residency}
                      onChange={(e) => {
                        setInvalidInput();
                        residencyChangeHandler(e.target.value);
                      }}
                      onBlur={residencyBlurHandler}
                      className={`${residencyClass} ${styles.select}`}
                    >
                      <option hidden>residency</option>
                      <option value="AUSTRALIANRESIDENT">Australian resident</option>
                      <option value="FOREIGNRESIDENT">Foreign Resident</option>
                      <option value="WORKINGHOLIDAYMAKER">Working Holiday Maker</option>
                    </select>
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
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="classification"
                    value={classificationIsValid}
                    onChange={(e) => {
                      setInvalidInput();
                      classificationChangeHandler(e.target.value);
                    }}
                    onBlur={classificationBlurHandler}
                    className={classificationClass}
                  />
                  <p className={styles.classification}>Find classification</p>
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
                      onBlur={taxFreeBlurHandler}
                    />
                    <label htmlFor="taxFree">Claiming Tax Free Threshold?</label>
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
                      onBlur={taxFreeBlurHandler}
                    />
                    <label htmlFor="help">Has a Higher Education Loan Program (HELP), Student Start-Up Loan (SSL) or Trade Support Loan (TSL) debt?</label>
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
                      onBlur={supplementBlurHandler}
                    />
                    <label htmlFor="supplement">Has financial supplement debt?</label>
                  </div>

                  <p>Bank Account 1:</p>
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

                  <p>Bank Account 2:</p>
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
              </div>
              <div className={styles["submit-container"]}>
                {/* <BlackButton onClick={submitHandler} disabled={isLoading && 'disabled'} >{isLoading ? <i className="fa fa-spinner fa-spin fa-fw"></i> : "SUBMIT"}</BlackButton> */}
                <p style={{ color: "red" }}>{invalidInput}</p>
              </div>
            </form>
          </InfoCard>
        </div>
      )}
    </>
  );
};

export default Applications;
