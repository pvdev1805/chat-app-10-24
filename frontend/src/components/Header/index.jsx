import "./Header.css";

const Header = () => {
  return (
    <>
      <header>
        <div className="header__container">
          <div className="header__logo">
            <img src="../../../public/logo.png" alt="PCoding" />
          </div>

          <div className="header__greeting">Welcome !</div>
        </div>
      </header>
    </>
  );
};

export default Header;
