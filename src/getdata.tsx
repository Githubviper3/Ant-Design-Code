import { useSelect } from "@refinedev/core";

interface ICategory {
  id: number;
  firstName: string;
  lastName: string;
  pagination: {
    current: 1,
    pageSize: 50,
  }
}

export const SelectStuff: React.FC = () => {
  const { options } = useSelect<ICategory>({
    resource: "users",
    optionLabel: (item) => `${item.firstName} ${item.lastName}`
  });

  return (
    <label>
      Select a category:
      <select>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
            {console.log(option)}
          </option>
        ))}
      </select>
    </label>
  );
};