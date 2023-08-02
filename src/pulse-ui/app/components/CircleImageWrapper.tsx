import { styled } from "@mui/material/styles";

type CircleImageWrapperProps = {
    size: number;
};

const CircleImageWrapper = styled("div")(({ size }: CircleImageWrapperProps) => ({
    width: size,
    height: size,
    borderRadius: "50%",
    boxShadow: "0 0 4px 0 #b3bac7",
    overflow: "hidden",
}));

export default CircleImageWrapper;
