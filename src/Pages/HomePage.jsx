import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React from 'react'
import Login from '../Components/Authentication/Login'
import SignUp from '../Components/Authentication/SignUp'
const HomePage = () => {
  return (
    <Container maxW='xl' centerContent>
      {/* TITLE BOX */}
      <Box p={3} bg={'white'} w="100%" m="40px 0 15px 0" borderRadius={"lg"} borderWidth={"1px"} >
        <Text textAlign={'center'} fontSize="4xl" fontFamily="Work sans" color="black">
          TALK-A-TIVE
        </Text>
      </Box>
      {/* LOGIN AND SIGNUP BOX */}
      <Box color="black" bgColor={'white'} w='100%' p={4} borderRadius={'lg'} borderWidth={'1px '}>
        <Tabs variant='soft-rounded' >
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">SignUp</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <SignUp/>
            </TabPanel> 
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default HomePage