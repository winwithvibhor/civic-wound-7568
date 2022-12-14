import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Image,
  Link,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  Search2Icon,
} from "@chakra-ui/icons";

import { GiBatMask } from "react-icons/gi";
import { AiOutlineLogout } from "react-icons/ai";
import { TbPremiumRights, TbZoomMoney } from "react-icons/tb";
import { FaDonate } from "react-icons/fa";

import { BsThreeDotsVertical, BsChatSquareQuote } from "react-icons/bs";
import { RiShutDownLine, RiRestartLine, RiFileShredLine } from "react-icons/ri";
import { BsPerson } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";

import { useNavigate, Link as RouteLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";

export default function NavBar() {
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();
  const { batUser, login, logout, isAuth } = useContext(AuthContext);
  console.log("isAuth:", isAuth);

  return (
    <Box>
      <Flex
        position="fixed"
        zIndex="999"
        top="0"
        w="100%"
        bg={useColorModeValue("#0f0b06", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"80px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Image
            onClick={() => navigate(`/`)}
            h="60px"
            src="/altbatman_logo.png"
            cursor="pointer"
          />

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
          alignItems="center"
        >
          <RouteLink
            to="/cart"
            style={{ color: "white", fontSize: "25px", fontWeight: "500" }}
            href="/cart"
          >
            Cart
          </RouteLink>
          <GiBatMask fontSize="30px" color="white" />
          <Text
            style={{ display: isAuth ? "block" : "none" }}
            color="white"
            fontSize="22px"
          >
            {batUser.name}
          </Text>
          {
            <Flex style={{ display: isAuth ? "block" : "none" }}>
              <Popover placement="bottom" isLazy>
                <PopoverTrigger>
                  <IconButton
                    bg="black"
                    color="white"
                    fontSize="2xl"
                    aria-label="More server options"
                    icon={<BsPerson />}
                    w="fit-content"
                    _hover={{ bg: "#fbd309", color: "black" }}
                  />
                </PopoverTrigger>
                <PopoverContent w="fit-content" _focus={{ boxShadow: "none" }}>
                  <PopoverArrow />
                  <PopoverBody bg="black">
                    <Stack>
                      <Button
                        color="#fbd309"
                        w="194px"
                        variant="ghost"
                        rightIcon={<CgProfile />}
                        justifyContent="space-between"
                        fontWeight="normal"
                        colorScheme="yellow"
                        fontSize="sm"
                        _hover={{ bg: "#fbd309", color: "black" }}
                      >
                        {batUser.name}'s Profile
                      </Button>
                      <Button
                        color="#fbd309"
                        w="194px"
                        variant="ghost"
                        rightIcon={<FaDonate />}
                        justifyContent="space-between"
                        fontWeight="normal"
                        colorScheme="yellow"
                        fontSize="sm"
                        _hover={{ bg: "#fbd309", color: "black" }}
                      >
                        Donate ?
                      </Button>
                      <Button
                        color="#fbd309"
                        w="194px"
                        variant="ghost"
                        rightIcon={<TbZoomMoney />}
                        justifyContent="space-between"
                        fontWeight="normal"
                        colorScheme="yellow"
                        fontSize="sm"
                        _hover={{ bg: "#fbd309", color: "black" }}
                      >
                        Lucky Draw
                      </Button>
                      <Button
                        onClick={logout}
                        w="194px"
                        variant="ghost"
                        rightIcon={<AiOutlineLogout />}
                        color="white"
                        justifyContent="space-between"
                        fontWeight="normal"
                        fontSize="md"
                        _hover={{ bg: "white", color: "black" }}
                      >
                        <b>Logout</b>
                      </Button>
                    </Stack>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Flex>
          }
          {
            <Button
              style={{ display: isAuth ? "none" : "block" }}
              display={{ base: "block", md: "inline-flex" }}
              fontSize={"xl"}
              fontWeight={600}
              color={"white"}
              bg={"#0f0b06"}
              href={"#"}
              variant="outline"
              onClick={() => navigate(`/login`)}
              _hover={{
                bg: "white",
                color: "#0f0b06",
                border: "1px solid black",
              }}
            >
              Login
            </Button>
          }
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const navigate = useNavigate();

  return (
    <Stack display="flex" alignItems="center" direction={"row"} spacing={4}>
      <Menu w="100px">
        <MenuButton
          bg="#0f0b06"
          color="white"
          colorScheme="#fbd309"
          fontSize="2xl"
          borderRadius="0px"
          as={Button}
          leftIcon={<HamburgerIcon />}
          _hover={{ bg: "#0f0b06", color: "white" }}
        >
          MENU
        </MenuButton>

        <MenuList bg="#0f0b06" color="#fbd309">
          <MenuGroup color="white" bg="#0f0b06" title="Bat Categories">
            <MenuItem
              onClick={() => navigate(`/products/laptops`)}
              bg="#0f0b06"
              _hover={{ bg: "#fbd309", color: "#0f0b06" }}
            >
              Laptops
            </MenuItem>
            <MenuItem
              onClick={() => navigate(`/products/phones`)}
              bg="#0f0b06"
              _hover={{ bg: "#fbd309", color: "#0f0b06" }}
            >
              Mobiles
            </MenuItem>
            <MenuItem
              onClick={() => navigate(`/products/tv`)}
              bg="#0f0b06"
              _hover={{ bg: "#fbd309", color: "#0f0b06" }}
            >
              TVs
            </MenuItem>
            <MenuItem
              onClick={() => navigate(`/products/macbook`)}
              bg="#0f0b06"
              _hover={{ bg: "#fbd309", color: "#0f0b06" }}
            >
              MacBooks
            </MenuItem>
            <MenuItem
              onClick={() => navigate(`/products/speakers`)}
              bg="#0f0b06"
              _hover={{ bg: "#fbd309", color: "#0f0b06" }}
            >
              Speakers
            </MenuItem>
            <MenuItem
              onClick={() => navigate(`/products/gaming`)}
              bg="#0f0b06"
              _hover={{ bg: "#fbd309", color: "#0f0b06" }}
            >
              Gaming Zone
            </MenuItem>
            <MenuItem
              onClick={() => navigate(`/products/smartwatch`)}
              bg="#0f0b06"
              _hover={{ bg: "#fbd309", color: "#0f0b06" }}
            >
              Watches
            </MenuItem>
            <MenuItem
              onClick={() => navigate(`/products/excuisite`)}
              bg="#0f0b06"
              _hover={{ bg: "#fbd309", color: "#0f0b06" }}
            >
              Excuisite Stuff
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>

      <Stack spacing={3}>
        <InputGroup ml="12" w="199%">
          <InputRightElement
            pointerEvents="none"
            children={<Search2Icon color="gray.800" />}
          />
          <Input
            bg="white"
            color="gray.800"
            type="search"
            placeholder="Search Bat Buy"
          />
        </InputGroup>
      </Stack>
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack
      position="fixed"
      top="0"
      bg={useColorModeValue("#0f0b06", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      <MobileNavItem />
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Menu w="100px">
          <MenuList bg="#0f0b06" color="#fbd309">
            <MenuGroup color="white" bg="#0f0b06" title="Bat Categories">
              <MenuItem
                onClick={() => navigate(`/products/laptops`)}
                bg="#0f0b06"
                _hover={{ bg: "#fbd309", color: "#0f0b06" }}
              >
                Laptops
              </MenuItem>
              <MenuItem
                onClick={() => navigate(`/products/phones`)}
                bg="#0f0b06"
                _hover={{ bg: "#fbd309", color: "#0f0b06" }}
              >
                Mobiles
              </MenuItem>
              <MenuItem
                onClick={() => navigate(`/products/tv`)}
                bg="#0f0b06"
                _hover={{ bg: "#fbd309", color: "#0f0b06" }}
              >
                TVs
              </MenuItem>
              <MenuItem
                onClick={() => navigate(`/products/macbook`)}
                bg="#0f0b06"
                _hover={{ bg: "#fbd309", color: "#0f0b06" }}
              >
                MacBooks
              </MenuItem>
              <MenuItem
                onClick={() => navigate(`/products/speakers`)}
                bg="#0f0b06"
                _hover={{ bg: "#fbd309", color: "#0f0b06" }}
              >
                Speakers
              </MenuItem>
              <MenuItem
                onClick={() => navigate(`/products/gaming`)}
                bg="#0f0b06"
                _hover={{ bg: "#fbd309", color: "#0f0b06" }}
              >
                Gaming Zone
              </MenuItem>
              <MenuItem
                onClick={() => navigate(`/products/smartwatch`)}
                bg="#0f0b06"
                _hover={{ bg: "#fbd309", color: "#0f0b06" }}
              >
                Watches
              </MenuItem>
              <MenuItem
                onClick={() => navigate(`/products/excuisite`)}
                bg="#0f0b06"
                _hover={{ bg: "#fbd309", color: "#0f0b06" }}
              >
                Excuisite Stuff
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          <Menu w="100px">
            <MenuList bg="#0f0b06" color="#fbd309">
              <MenuGroup color="white" bg="#0f0b06" title="Bat Categories">
                <MenuItem
                  onClick={() => navigate(`/products/laptops`)}
                  bg="#0f0b06"
                  _hover={{ bg: "#fbd309", color: "#0f0b06" }}
                >
                  Laptops
                </MenuItem>
                <MenuItem
                  onClick={() => navigate(`/products/phones`)}
                  bg="#0f0b06"
                  _hover={{ bg: "#fbd309", color: "#0f0b06" }}
                >
                  Mobiles
                </MenuItem>
                <MenuItem
                  onClick={() => navigate(`/products/tv`)}
                  bg="#0f0b06"
                  _hover={{ bg: "#fbd309", color: "#0f0b06" }}
                >
                  TVs
                </MenuItem>
                <MenuItem
                  onClick={() => navigate(`/products/macbook`)}
                  bg="#0f0b06"
                  _hover={{ bg: "#fbd309", color: "#0f0b06" }}
                >
                  MacBooks
                </MenuItem>
                <MenuItem
                  onClick={() => navigate(`/products/speakers`)}
                  bg="#0f0b06"
                  _hover={{ bg: "#fbd309", color: "#0f0b06" }}
                >
                  Speakers
                </MenuItem>
                <MenuItem
                  onClick={() => navigate(`/products/gaming`)}
                  bg="#0f0b06"
                  _hover={{ bg: "#fbd309", color: "#0f0b06" }}
                >
                  Gaming Zone
                </MenuItem>
                <MenuItem
                  onClick={() => navigate(`/products/smartwatch`)}
                  bg="#0f0b06"
                  _hover={{ bg: "#fbd309", color: "#0f0b06" }}
                >
                  Watches
                </MenuItem>
                <MenuItem
                  onClick={() => navigate(`/products/excuisite`)}
                  bg="#0f0b06"
                  _hover={{ bg: "#fbd309", color: "#0f0b06" }}
                >
                  Excuisite Stuff
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Inspiration",
    children: [
      {
        label: "Explore Design Work",
        subLabel: "Trending Design to inspire you",
        href: "#",
      },
      {
        label: "New & Noteworthy",
        subLabel: "Up-and-coming Designers",
        href: "#",
      },
    ],
  },
  {
    label: "Find Work",
    children: [
      {
        label: "Job Board",
        subLabel: "Find your dream design job",
        href: "#",
      },
      {
        label: "Freelance Projects",
        subLabel: "An exclusive list for contract work",
        href: "#",
      },
    ],
  },
  {
    label: "Learn Design",
    href: "#",
  },
  {
    label: "Hire Designers",
    href: "#",
  },
];
