import { useForm } from "react-hook-form";
import { fetchData } from "../../../../helper/helperUtils";
import { useNavigate } from "react-router-dom";

export function EditUserForm({ editing, cancel }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log("checking editing");
  console.log(editing);

  async function submitChange(data) {
    if (editing === "username") {
      const dataToSubmit = JSON.stringify({ username: data.edit });
      const response = await fetchData(
        `user/change_username`,
        "PUT",
        dataToSubmit
      );
      if (!response.ok || response instanceof Error) {
        navigate("/error");
      } else {
        console.log("username successfully changed");
        cancel();
      }
    } else if (editing === "password") {
      const dataToSubmit = JSON.stringify({ password: data.edit });
      console.log("checking dataToSubmit");
      console.log(dataToSubmit);
      const response = await fetchData(
        `user/change_password`,
        "PUT",
        dataToSubmit
      );
      if (!response.ok || response instanceof Error) {
        navigate("/error");
      } else {
        console.log("password successfully changed");
        cancel();
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(submitChange)}>
      <button onClick={cancel}>cancel</button>
      {errors.edit && <span>Must be between 3-25 characters</span>}
      <input
        type="text"
        {...register("edit", { minLength: 3, maxLength: 25 })}
      />
      <input type="submit" />
    </form>
  );
}
