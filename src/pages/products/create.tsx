import { useForm,useSelect } from "@refinedev/core";

export const CreateProduct = () => {
  const { onFinish, mutation } = useForm({
    action: "create",
    resource: "products",
  });

  const { options } = useSelect({
    resource: "categories",
    // optionLabel: "title", // Default value is "title" so we don't need to provide it.
    // optionValue: "id", // Default value is "id" so we don't need to provide it.
  });


  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Using FormData to get the form values and convert it to an object.
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    // Calling onFinish to submit with the data we've collected from the form.

    onFinish({
      ...data,
      price: Number(data.price).toFixed(2),
      category: { id: Number(data.category) },
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" />
      </div>
      <br />
      <div>
      <label htmlFor="description">Description</label>
      <textarea id="description" name="description" />
      </div>
      <br />
      <div>
      <label htmlFor="price">Price</label>
      <input type="number" id="price" name="price" step=".01" />
      </div>
      <br />
      <div>
      <label htmlFor="material">Material</label>
      <input type="text" id="material" name="material" />
      </div>
      <br />
      <div>
      <label htmlFor="category">Category ID</label>
      <select id="category" name="category">
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      </div>
      <br />
      {mutation.isSuccess && <span>successfully submitted!</span>}
      <button type="submit">Submit</button>
    </form>
  );
};