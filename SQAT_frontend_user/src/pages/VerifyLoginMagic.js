import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loginWithMagicLink } from "../Api/auth";

export default function VerifyLoginMagic(props) {
  let params = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    // debugger;
    // props.signIn(params.email, params.link)
    const verifyMagicLink = async () => {
      if (params.link) {
        console.log("params.link--", params.link, params.email);
        const response = await loginWithMagicLink(params.email, params.link);
        console.log("response", response);
        if (response.code === 200) {
          alert(response.message);
          window.close()
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
