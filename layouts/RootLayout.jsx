import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Center, Flex, Grid, GridItem } from "@chakra-ui/react";

export default function RootLayout() {
    return (
        <Grid bg="gray.200" >
            <GridItem 
                border="1px solid black"
                display="flex"
                justifyContent="end"

                p="5px"
                pr="30px"
            >
                <Navbar />
            </GridItem>
            <GridItem
                border="1px solid black"
            >
                <Outlet />
            </GridItem>
        </Grid>
    )
}