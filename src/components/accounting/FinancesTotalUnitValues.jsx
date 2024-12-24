import {IoRemoveCircle} from "react-icons/io5";
import { calculateMonthlyPayment, convertToUSD } from "../../utilities/financeCalculations.js";
import {NavLink} from "react-router-dom";
import { Box, Table } from '@mantine/core'


const FinancesTotalUnitValues = ({ unitFinance, selectedTerm, removeUnit }) => {

    const { unitID, financeID, houseNumber, street, apartmentNumber, city, state, zip, tenant, user } = unitFinance
    const { principal, interest, term } = unitFinance.mortgage
    return (

        <Table.Tr>
            <Table.Td>
                <Box>
                  {/*<IconButton onClick={()=>removeUnit(unitFinance.financeID)}>
                        <IoRemoveCircle />
                    </IconButton>*/}

                    <NavLink
                        to={{ pathname: `../unit/${unitID}`}}
                        state={unitID}
                        style={{ fontWeight: "600"}}
                    >
                        {houseNumber} {street} {apartmentNumber}
                    </NavLink>
                </Box>
            </Table.Td>

            <Table.Td sx={{ display: { xs: "none", md: "revert" }}}>
                {convertToUSD((calculateMonthlyPayment(principal, interest, term)) * selectedTerm)}
            </Table.Td>

            <Table.Td sx={{ display: { xs: "none", md: "revert" }}}>
                {convertToUSD(unitFinance.propertyTax * selectedTerm)}
            </Table.Td>

            <Table.Td sx={{ display: { xs: "none", md: "revert" }}}>
                {convertToUSD(unitFinance.insurance * selectedTerm)}
            </Table.Td>

            <Table.Td sx={{ display: { xs: "none", md: "revert" }}}>
                {convertToUSD(unitFinance.hoa * selectedTerm)}
            </Table.Td>

            <Table.Td  sx={{ display: { md: "none" }}}>
              {convertToUSD(calculateMonthlyPayment(principal, interest, term) * selectedTerm + unitFinance.propertyTax * selectedTerm + unitFinance.insurance * selectedTerm)}
            </Table.Td>

            <Table.Td>
                {convertToUSD(unitFinance.rent * selectedTerm)}
            </Table.Td>
        </Table.Tr>
    );
};

export default FinancesTotalUnitValues;