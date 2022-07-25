import { useSelector } from "react-redux";

interface IRootState {
    auth: {
        user: {
            name: string,
            email: string
        }
    }
}

export const useAuth = () => {
    const { user } = useSelector((state: IRootState) => state.auth)

    const isAuth = !!user.email;
    const email = user.email;
    const name = user.name;

    return {isAuth, email, name};
}