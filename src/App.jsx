import React, { Component } from "react";
import styles from "./App.module.css";
import { callApi , setSession} from "./api";

class App extends Component {
    constructor() {
        super();
        this.state = { menuOpen: false, isSignIn: true };
        this.toggleMenu = this.toggleMenu.bind(this);
        this.toggleSignIn = this.toggleSignIn.bind(this);
        this.userRegistration = this.userRegistration.bind(this);
        this.getResponse = this.getResponse.bind(this);
        this.forgetpassword=this.forgetpassword.bind(this);
        this.signin=this.signin.bind(this);
        
    }

    toggleMenu() {
        this.setState({ menuOpen: !this.state.menuOpen });
    }

    toggleSignIn() {
        this.setState({ isSignIn: !this.state.isSignIn });
    }



    userRegistration() {
        let fullname = document.getElementById("firstname");
        let email = document.getElementById("email");
        let role = document.getElementById("role");
        let signuppassword = document.getElementById("signuppassword");
        let confirmpassword = document.getElementById("confirmpassword");

        fullname.style.border = "";
        email.style.border = "";
        role.style.border = "";
        signuppassword.style.border = "";
        confirmpassword.style.border = "";

        if (fullname.value === "") {
            fullname.style.border = "1px solid red";
            fullname.focus();
            return;
        }
        if (email.value === "") {
            email.style.border = "1px solid blue";
            email.focus();
            return;
        }
        if (role.value === "") {
            role.style.border = "1px solid yellow";
            role.focus();
            return;
        }
        if (signuppassword.value === "") {
            signuppassword.style.border = "1px solid red";
            signuppassword.focus();
            return;
        }
        if (signuppassword.value !== confirmpassword.value) {
            signuppassword.style.border = "1px solid purple";
            signuppassword.focus();
            return;
        }

        let data = JSON.stringify({
            fullname: fullname.value,
            email: email.value,
            role: role.value,
            password: signuppassword.value,
        });

        callApi("POST", "http://localhost:8089/users/signup", data, this.getResponse);
    }

    getResponse(res) {
        let resp = res.split("::");
        alert(resp[1]);
if (resp[0] === "200") {
    alert(resp[1]);
    window.location.replace("#signin");
}
    }


    forgetpassword()
    {
        username.style.border="";
        if(username.value==="")
        {
            username.style.border="1px solid red";
            username.focus();
            return;
        }
        let url="http://localhost:8089/users/forgetpassword/"+username.value;
        callApi("GET",url,"",this.forgetpasswordResponse);
    }
    forgetpasswordResponse(res)
    {
        let data=res.split('::');
        if(data[0]==="200")
        {
            responseDiv1.innerHTML=`<br/><br/><br/><label style='color:green'>${data[1]}</label>`;
        }
        else
        {
            responseDiv1.innerHTML=`<br/><label style='color:red'>${data[1]}</label>`;
        }     
    } 


    signin()
    {
        username.style.border="";
        password.style.border="";
        responseDiv1.innerHTML="";
        if(username.value==="")
        {
            username.style.border="1px solid red";
            username.focus();
            return;
        }
        if(password.value==="")
        {
            password.style.border="1px solid red";
            password.focus();
            return;
        }
        let data=JSON.stringify({
            email:username.value,
            password:password.value
        });
        callApi("POST","http://localhost:8089/users/signin",data,this.signinResponse);
    }
    signinResponse (res) 
    {
        let rdata=res.split("::");
        if(rdata[0]==="200")
        {
            setSession("csrid",rdata[1],1);
            window.location.replace("/dashboard");
        }
        else
        {
            responseDiv1.innerHTML=`<br/><br/><label style='color:red'>${rdata[1]}</label>`;
        }
    }
        

    render() {
      return (
          <div className={styles.App}>
              <nav className={styles.navbar}>
                  <img className={styles.logo} src="./logo.png" alt="Logo" />
                  <div className={styles.menu}>
                      <img
                          className={styles.menuBtn}
                          src={this.state.menuOpen ? "./closeIcon.png" : "./menuIcon.png"}
                          alt="menu-button"
                          onClick={this.toggleMenu}
                      />
                      <ul
                          className={`${styles.menuItems} ${this.state.menuOpen ? styles.menuOpen : ""}`}
                          onClick={this.toggleMenu}
                      >
                          <li><a href="#about">About</a></li>
                          <li><a href="#members">Members</a></li>
                          <li><a href="#contact">Contact</a></li>
                          <li>
                          <a href="#signin" className={styles.signInButton}>
                             Sign In
                          </a>

                          </li>
                      </ul>
                  </div>
              </nav>
  
              {/* Hero Section */}
              <section className={styles.herocontainer}>
            <div className={styles.herocontent}>
                <h1 className={styles.herotitle}>Hello Farmify</h1>
                <p>this is farmify farmify welcome</p>
                <a href="#signin">
    <button className={styles.getStartedBtn}>Get Started</button>
</a>

            </div>
            <img src="./farmer.png" className={styles.farmerImg} alt="Farmer" />
            <div className={styles.topBlur} />
            <div className={styles.bottomBlur} />
        </section>
  
              {/* Authentication Forms */}
              <section id='signin'>
              <div className={styles.logincontainer}>
                  <div className={styles.loginwrapper}>

                  <div className={styles.loginimageContainer}>
                    <img src="./farmer2.png" alt="Sign In" />
                </div>

                      <div className={styles.formContainer}>
                          {this.state.isSignIn ? (
                              <div id="signin">
                                  <h2>Login</h2>
                                  <input type="text" id="username" placeholder="Username" />
                                  <input type="password" id="password" placeholder="Password" />
                                  <div className='forgetPassword'>Forget <label onClick={this.forgetpassword}>Password?</label></div>
                                  <button className={styles.signInButton} onClick={this.signin}>SIGN IN</button>
                                  <div className='div1' id='responseDiv1'></div>
                                  <p>Don't have an account? <span onClick={this.toggleSignIn}>Sign Up</span></p>
                              </div>
                          ) : (
                              <div id="signup">
                                  <h2>Sign Up</h2>
                                  <input type="text" id="firstname" placeholder="Full Name" />
                                  <input type="email" id="email" placeholder="Email" />
                                  <select id="role">
                                      <option value="">Select Role</option>
                                      <option value="1">Admin</option>
                                      <option value="2">Farmer</option>
                                      <option value="3">Buyer</option>
                                  </select>
                                  <input type="password" id="signuppassword" placeholder="Password" />
                                  <input type="password" id="confirmpassword" placeholder="Confirm Password" />
                                  <button onClick={this.userRegistration}>Register</button>
                                  <p>Already have an account? <span onClick={this.toggleSignIn}>Sign In</span></p>
                              </div>
                          )}
                      </div>
                  </div>
              </div>
              </section>
              {/* About Section */}
              <section className={styles.aboutcontainer} id="about">
                  <h2 className={styles.abouttitle}>About</h2>
                  <div className={styles.aboutcontent}>
                      <img src="./farmer1.png" className={styles.farmer1Img} alt="Farmer" />
                      <ul className={styles.aboutItems}>
                          <li className={styles.aboutItem}>
                              <h3>About 1</h3>
                              <p>Sell Agri Produce 
                                Sell your agriculture products without any mediator</p>
                          </li>
                          <li className={styles.aboutItem}>
                              <h3>About 2</h3>
                              <p>Buy Agri Produce
                                Now Farmers can sell their produce directly to end consumers there are no more mediator</p>
                          </li>
                          <li className={styles.aboutItem}>
                              <h3>About 3</h3>
                              <p>Anywhere, Anytime
                                 Indias no 1 Marketplace for farmers can buy and sell their agriculture produce.</p>
                          </li>
                      </ul>
                  </div>
              </section>


              <section className={styles.membersContainer} id="members">
    <h2 className={styles.membersTitle}>Our Members</h2>
    <div className={styles.membersContent}>
        <div className={styles.member}>
            <img src="./member1.jpeg" className={styles.memberImage} alt="Member 1" />
            <h3>umasri lakshmi</h3>
            <p>umasri is a full-stack developer with a passion for creating scalable web applications.</p>
        </div>
        <div className={styles.member}>
            <img src="./member2.jpeg" className={styles.memberImage} alt="Member 2" />
            <h3>pavani</h3>
            <p>pavani is a data scientist who specializes in machine learning and AI-driven solutions.</p>
        </div>
        <div className={styles.member}>
            <img src="./member3.jpeg" className={styles.memberImage} alt="Member 3" />
            <h3>Tanushree</h3>
            <p>Tanushree is a front-end developer who loves to build intuitive user interfaces with React.</p>
        </div>
    </div>
</section>
  
              {/* Contact Section */}
              <footer className={styles.contactcontainer} id="contact">
                  <div className={styles.text}>
                      <h2>Contact</h2>
                      <p>Feel free to reach out!</p>
                  </div>
                  <ul className={styles.links}>
                      <li className={styles.link}>
                          <img src="./emailIcon.png" alt="Email" />
                          <a href="mailto:farmify@gmail.com">farmify@gmail.com</a>
                      </li>
                      <li className={styles.link}>
                          <img src="./instaIcon.png" alt="Instagram" />
                          <a href="#">@farmify</a>
                      </li>
                      <li className={styles.link}>
                          <img src="./phoneIcon.png" alt="Phone" />
                          <a href="#">+91 1234567890</a>
                      </li>
                  </ul>
              </footer>
          </div>
      );
  }
}
  
export default App;

