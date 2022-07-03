import { useSelector } from "react-redux";

export const useAuth = () => {
    const { user } = useSelector(state => state.auth)

    const isAuth = !!user.email;
    const email = user.email;
    const name = user.name;
    const token = user.accessToken;

    return {isAuth, email, name, token};
}