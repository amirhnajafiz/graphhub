export default function HomePage() {
  const logo = require('@site/static/img/graphhub.croped.png').default;
  return (
    <div style={{textAlign: "center"}}>
      <img src={logo} role="img" />
    </div>
  );
}
