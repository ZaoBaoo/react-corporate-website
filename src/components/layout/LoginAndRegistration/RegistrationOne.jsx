import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// Store
import { useDispatch, useSelector } from "react-redux";
import { registrationAction } from "../../../store/slice/registrationSlice";

// Components
import { ButtonLogin } from "../../ButtonLogin/ButtonLogin";
import { InputLogin } from "../../InputLogin";
import { TextLogin } from "../../TextLogin";
import { ModalAndWrapper } from "./ModalAndWrapper";

import { textVal } from "./Validate";

const RegistrationOne = () => {
  // Navigate
  const next = useNavigate();

  // Selector store
  const { firstName, lastName } = useSelector((state) => state.registration);

  // HOOK USE FORM
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onSubmit",
    defaultValues: { firstName: firstName, lastName: lastName },
  });

  // Dispatch
  const dispatch = useDispatch();

  // (f)
  const saveFormInput = (data) => {
    dispatch(registrationAction.setFirstName(data.firstName));
    dispatch(registrationAction.setLastName(data.lastName));
  };

  // (f)
  const nextStep = (data) => {
    saveFormInput(data);
    next("/registrationtwo");
  };

  return (
    <form action="" onSubmit={handleSubmit(nextStep)}>
      <ModalAndWrapper>
        <TextLogin text="1 / 3" />
        <InputLogin
          register={register}
          errors={errors}
          val={textVal}
          name="firstName"
          mode="inputLine"
          label="Имя"
          type="text"
        />
        <InputLogin
          register={register}
          errors={errors}
          val={textVal}
          name="lastName"
          mode="inputLine"
          label="Фамилия"
          type="text"
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Link to="/login">
            <ButtonLogin mode="registration" name="НАЗАД" />
          </Link>

          <ButtonLogin mode="registration" name="ДАЛЕЕ" type="submit" />
        </div>
      </ModalAndWrapper>
    </form>
  );
};

export { RegistrationOne };
