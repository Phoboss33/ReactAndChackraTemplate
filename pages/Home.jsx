import { Grid } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Test from "./test";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

export default function Home() {
  return (
    <Grid>
      <Test />
    </Grid>
  )
}
