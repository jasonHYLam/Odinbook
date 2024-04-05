import { fetchData } from "../../helper/helperUtils";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  async function submitSignupData(data) {
    const dataToSubmit = JSON.stringify(data);
    const response = fetchData("/auth/signup", "POST", dataToSubmit);

    console.log("we good");
  }

  return (
    <main>
      <p>Signup</p>
      <form onSubmit={handleSubmit()}>
        <input
          type="text"
          placeholder="Username"
          {...register("username", { required: true, maxLength: 20 })}
        />

        <input
          type="password"
          placeholder="Password"
          {...register("username", { required: true })}
        />

        <input
          type="password"
          placeholder="Confirm password"
          {...register("username", {
            required: true,
            validate: (val) => {
              if (getValues("password") !== val) {
                return "Passwords don't match";
              }
            },
          })}
        />
      </form>
    </main>
  );
}
