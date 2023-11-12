import { AddIcon, EditIcon, ExternalLinkIcon, HamburgerIcon, RepeatIcon, SearchIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, IconButton, Input, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <>
      <IconButton 
        ref={btnRef} 
        colorScheme='cyan' 
        onClick={onOpen}
        aria-label='Search database'
        icon={<HamburgerIcon />}
      />
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Навигация</DrawerHeader>

          <DrawerBody >
            <Box>
              <Flex flexDirection="column" >
                <NavLink to="/">
                  <Button my={1} bg="none">Home</Button>
                </NavLink>

                <NavLink to="/login">
                  <Button my={1} bg="none">Login</Button>
                </NavLink>

                <NavLink to="/signup">
                  <Button my={1} bg="none">Sing up</Button>
                </NavLink>
              </Flex>
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='cyan'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
