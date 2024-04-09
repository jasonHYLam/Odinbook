import { useForm } from "react-hook-form";
import { fetchData } from "../../../../helper/helperUtils";
import { useNavigate } from "react-router-dom";

export function EditUserForm({ editing }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function submitChange(data) {
    const dataToSubmit = JSON.stringify({ data });
    if (editing === "username") {
      const response = await fetchData(
        `user/change_username`,
        "PUT",
        dataToSubmit
      );
      if (!response.ok || response instanceof Error) {
        navigate("/error");
      }
    } else if (editing === "password") {
      const response = await fetchData(
        `user/change_password`,
        "PUT",
        dataToSubmit
      );
      if (!response.ok || response instanceof Error) {
        navigate("/error");
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(submitChange)}>
      {errors.edit && <span>Must be between 3-25 characters</span>}
      <input
        type="text"
        {...register("edit", { minLength: 3, maxLength: 25 })}
      />
      <input type="submit" />
    </form>
  );
}
