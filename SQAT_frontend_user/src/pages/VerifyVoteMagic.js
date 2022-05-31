import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyWithMagicLink } from "../Api/auth";

export default function VerifyVoteMagic(props) {
  let params = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    // debugger;
    // props.signIn(params.email, params.link)
    const verifyMagicLink = async () => {
      if (params.link) {
        console.log("params.link--", params.link, params.email);
        const response = await verifyWithMagicLink(params.email, params.link);
        console.log("response", response);
        if (response.code === 200) {
          alert(response.message);
          navigate('/candidate_list')
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
