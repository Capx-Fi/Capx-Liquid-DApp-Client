import "./ProjectOwnerDashboardScreen.scss";

const currentDate = new Date();
let datetime = currentDate.toLocaleString("en-US");
function TokensReleasedGraphLoading() {
  return (
    <section className="tokensreleasedgraphcontainer min-h-360px ">
      <div className="tokensreleasedgraphcontainer_titlecontainer">
        <div className="tokensreleasedgraphcontainer_titlecontainer_title">
          TOKENS RELEASED SO FAR
        </div>
        <div className="tokensreleasedgraphcontainer_titlecontainer_tokensreleased">
          <div className="tokensreleasedgraphcontainer_titlecontainer_tokensreleased_value_loading"></div>
          <div className="tokensreleasedgraphcontainer_titlecontainer_tokensreleased_date_loading"></div>
        </div>
      </div>

      <div className="tokensreleasedgraphcontainer_innercontainer_loading"></div>
    </section>
  );
}

export default TokensReleasedGraphLoading;
