import { Input } from '@mantine/core'

const SearchUnits = ({ query, setQuery }) => {

	return (
		<Input
			type="text"
			name="search"
			placeholder="Search Units"
			value={query}
			onChange={(e)=>setQuery(e.target.value)}
		></Input>

	);
};

export default SearchUnits;