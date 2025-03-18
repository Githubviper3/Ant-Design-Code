import { useForm, useSelect } from "@refinedev/core";

export const EditProduct = () => {
  const { onFinish, mutation, query } = useForm({
    action: "edit",
    resource: "products",
    id: "123",
  });

  console.log("query"+query)

  const record = query.data?.data;

  const { options } = useSelect({
    resource: "categories",
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Using FormData to get the form values and convert it to an object.
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    // Calling onFinish to submit with the data we've collected from the form.
    console.log(data)
    onFinish({
      ...data,
      price: Number(data.price).toFixed(2),
      category: { id: Number(data.category) },
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
  <label htmlFor="name">Name</label>  <br />
  <input type="text" id="name" name="name" defaultValue={record?.name} />
  <br />
</div>

<div>
  <label htmlFor="description">Description</label>
  <br />
  <textarea
    id="description"
    name="description"
    defaultValue={record?.description}
  />
  <br />
</div>

<div>
  <label htmlFor="price">Price</label>
  <br />
  <input
    type="text"
    id="price"
    name="price"
    pattern="\d*\.?\d*"
    defaultValue={record?.price}
  />
  <br />
</div>

<div>
  <label htmlFor="material">Material</label>
  <br />
  <input
    type="text"
    id="material"
    name="material"
    defaultValue={record?.material}
  />
  <br />
</div>

<div>
  <label htmlFor="category">Category</label>
  <br />
  <select id="category" name="category">
    {options?.map((option) => (
      <option
        key={option.value}
        value={option.value}
        selected={record?.category.id == option.value}
      >
        {option.label}
      </option>
    ))}
  </select>
  <br />
</div>

{mutation.isSuccess && <span>successfully submitted!</span>}

<div>
  <button type="submit">Submit</button>
</div>

    </form>
  );
};