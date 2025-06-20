import { useForm, useSelect } from "@refinedev/core";
type Formvalues = {
    restype: string
}
export const getData: React.FC = () => {
  const { register } = useForm<Formvalues>(
    
  );


  //   const { options } = useSelect({
  //     resource: ,
  //   });
  const onSubmit = (data: Formvalues) => {
    console.log("Data is"+ data)
  }
  return <>
    <form onSubmit={}>
        <label htmlFor="Type">Resource Type</label>
        <input type="text" id="Type" {...register("Type")}/>
    </form>
        <label htmlFor="category">Category</label>
        <br />
        <select id="category" name="category">
        {options?.map((option) => (
            <option key={option.value} value={option.value}>
            {option.label}
        </option>
        ))}
      </select>
      <br />

      </>
};
