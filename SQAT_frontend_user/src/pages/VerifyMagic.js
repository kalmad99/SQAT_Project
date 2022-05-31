import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loginWithMagicLink } from "../Api/auth";

export default function VerifyMagic(props) {
  let params = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    // debugger;
    // props.signIn(params.email, params.link)
    const verifyMagicLink = async () => {
      if (params.link) {
        console.log("params.link--", params.link);
        const response = await loginWithMagicLink(params.email, params.link);
        console.log("response", response);
        if (response.status === 200) {
          navigate("/");
        }
      }
    };
    // navigate('/')
    verifyMagicLink();
  }, []);

  return (
    <div>
      <p>Verifying your magic link</p>
      {/* <FadeLoader color={'black'} loading={true} css={override} size={50} /> */}
    </div>
  );
}
