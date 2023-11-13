import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/UseAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import useRefreshToken from "../hooks/UseRefreshToken";

const Users = () => {
    const [users, setUsers] = useState();
    const [accessToken, setAccessToken] = useState(""); // Сохранение access токена
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get("http://localhost:8000/api/v0/profile/", {
                    signal: controller.signal,
                    headers: {
                        Authorization: `Bearer ${accessToken}` // Передача access токена в заголовке
                    }
                })
                console.log(response.data)
                isMounted && setUsers(response.data)
            }
            catch (err) {
                console.log(err);
                navigate("/login", {state : {from: location}, replace: true})
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [accessToken]) // Передача accessToken в зависимости, чтобы выполнить запрос при каждом его изменении

    return (
        <article>
            <h2>User lists</h2>
            {users?.length ?
                (
                    <ul>
                        {users.map((user, i) => <li key={i}>{user?.user}</li>)}
                    </ul>
                ) : <p>No users to display</p>
            }
            <Button onClick={() => useRefreshToken(setAccessToken)}></Button> // Использование useRefreshToken с функцией обновления access токена
        </article>
    )
}

export default Users;