import { Box } from "@chakra-ui/react";

const Card = ({ children, ...rest }: any) => {
  return (
    <Box borderRadius="md" p="10" boxShadow="md" bgColor="white" {...rest}>
      {children}
    </Box>
  );
};

export default Card;
