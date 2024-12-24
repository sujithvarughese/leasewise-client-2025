import  { convertToUSD, totalMortgage, totalPropertyTax, totalInsurance, totalRent, totalHoa, totalProfit } from "../../utilities/financeCalculations.js";
import { Table, Text } from '@mantine/core'


const FinancesTotalCalculated = ({ unitFinances, selectedTerm }) => {

    return (
        <Table.Tr sx={{ fontWeight: "600"}}>
            <Table.Td></Table.Td>
            <Table.Td sx={{ display: { xs: "none", md: "revert" }}}>
              <Text>{convertToUSD(totalMortgage(unitFinances, selectedTerm))}</Text>
            </Table.Td>
            <Table.Td sx={{ display: { xs: "none", md: "revert" }}}>
              <Text>{convertToUSD(totalPropertyTax(unitFinances, selectedTerm))}</Text>
            </Table.Td>
            <Table.Td sx={{ display: { xs: "none", md: "revert" }}}>
              <Text>{convertToUSD(totalInsurance(unitFinances, selectedTerm))}</Text>
            </Table.Td>
            <Table.Td sx={{ display: { xs: "none", md: "revert" }}}>
              <Text>{convertToUSD(totalHoa(unitFinances, selectedTerm))}</Text>
            </Table.Td>
          <Table.Td sx={{ display: { md: "none" }}}>
            <Text>{convertToUSD(totalMortgage(unitFinances, selectedTerm) + totalPropertyTax(unitFinances, selectedTerm) + totalHoa(unitFinances, selectedTerm))}</Text>
          </Table.Td>
            <Table.Td>
              <Text>{convertToUSD(totalRent(unitFinances, selectedTerm))}</Text>
            </Table.Td>
        </Table.Tr>
    );
};


export default FinancesTotalCalculated;