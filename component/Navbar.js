import {
	AppstoreOutlined
  } from '@ant-design/icons';
  import { Menu } from 'antd';
  import { useState } from 'react';
  import { useNavigate }  from 'react-router-dom';


  function getItem(label, key, icon, children, type) {
	return {
	  key,
	  icon,
	  children,
	  label,
	  type,
	};
  }

  const items = [
	getItem('Home', '/'),
	getItem('Root of Equation', 'sub2', <AppstoreOutlined />, [
	  getItem('Bisection', '/Bisection'),
	  getItem('Falseposition', '/Falseposition'),
	  getItem('Onepoint', '/Onepoint'),
	  getItem('Taylor', '/Taylor'),
	  getItem('Newtoneraphson', '/Newtoneraphson'),
	  getItem('Secant', '/Secant'),
	]),getItem('Linear Algebra', 'sub2')
	,getItem('Regression', 'sub2')
	,getItem('Interpolation', 'sub2')
  ];
  const Navbar = () => {
	const navigate = useNavigate()
	const [collapsed, setCollapsed] = useState(false);
	const toggleCollapsed = () => {
	  setCollapsed(!collapsed);
	};
	return (
	  <div
		style={{
		  width: 256,
		}}
	  >
		<Menu
		  defaultSelectedKeys={['1']}
		  defaultOpenKeys={['sub1']}
		  mode="inline"
		  theme="dark"
		  inlineCollapsed={collapsed}
		  items={items}
		  onClick={({key})=>{

			navigate(key);
		  }}
		/>
	  </div>
	);
  };
  export default Navbar;