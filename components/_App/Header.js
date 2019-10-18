import { Menu, Container, Image, Icon } from "semantic-ui-react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const Header = ({ user }) => {
  console.log(user);
  const router = useRouter();

  const isActive = route => {
    return router.pathname === route;
  };

  return (
    <Menu stackable fluid id="menu" inverted>
      <Container text>
        <Link href="/">
          <Menu.Item header active={isActive("/")}>
            MUEBLER
          </Menu.Item>
        </Link>

        <Link href="/cart">
          <Menu.Item header active={isActive("/cart")} position="right">
            <Icon name="cart" size="small" />
            Cart
          </Menu.Item>
        </Link>

        {user && (
          <Link href="/create">
            <Menu.Item header active={isActive("/create")}>
              <Icon name="add square" size="small" />
              Create
            </Menu.Item>
          </Link>
        )}

        {user ? (
          <>
            <Link href="/account">
              <Menu.Item header active={isActive("/account")}>
                <Icon name="user" size="small" />
                Account
              </Menu.Item>
            </Link>

            <Menu.Item header>
              <Icon name="sign out" size="small" />
              Logout
            </Menu.Item>
          </>
        ) : (
          <>
            <Link href="/login">
              <Menu.Item basic header active={isActive("/login")}>
                <Icon name="sign in" size="small" />
                Login
              </Menu.Item>
            </Link>

            <Link href="/signup">
              <Menu.Item header active={isActive("/signup")}>
                <Icon name="signup" size="small" />
                Signup
              </Menu.Item>
            </Link>
          </>
        )}
      </Container>
    </Menu>
  );
};

export default Header;
