import { useState } from "react";
// import history from "../customRoutes/history";
import { useAppDispatch } from "../stores/store";
import { setToken, setUser } from "../stores/slices/userSlice";

const useFetch = (url:string) => {
    const [loadingGoogle, setLoading] = useState(false);
    const [error, setError] = useState("");
	const dispatch = useAppDispatch();
    const handleGoogle = async (response:any) => {
        // console.log(response.credential)
		setLoading(true);
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},

			body: JSON.stringify({ idToken: response.credential }),
		})
			.then((res) => {
				setLoading(false);

				return res.json();
			})
			.then((data) => {
				if (data.email) {
					
					const user = {
						email:data.email,
						firstName:data.firstName,
						lastName:data.lastName,
						token:data.token,
                        username:data.username
					}
					dispatch(setUser(user))
					dispatch(setToken(user.token));
					window.localStorage.setItem('netverse-token', user.token);
					// history.push('/')
				}
				// throw new Error(data?.message || data);
			})
			.catch((error) => {
                setError(error)
				console.log(error);
			});
    };
    return { loadingGoogle, error, handleGoogle };
};

export default useFetch;