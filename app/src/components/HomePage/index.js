export default function HomePage() {
  const logo = require('@site/static/img/graphhub.wb.png').default;
  const style = {
    textAlign: "center",
    margin: "50px 0"
  };
  return (
    <div style={style}>
      <img width={"500px"} src={logo} role="img" />
    </div>
  );
}
