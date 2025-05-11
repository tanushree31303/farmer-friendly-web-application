package farmify.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class Users {
    @Column(name = "fullname")
    String fullname;

    @Id
    @Column(name = "email")
    String email;

    @Column(name = "role")
    int role;

    @Column(name = "password")
    String password;

    // New fields
    @Column(name = "address")
    String address;

    @Column(name = "phone")
    String phone;

    @Column(name = "profile_picture")
    String profilePicture;

    // Getters and Setters for new fields
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    // Existing getters and setters
    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getRole() {
        return role;
    }

    public void setRole(int role) {
        this.role = role;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "Users [fullname=" + fullname + ", email=" + email + ", role=" + role + ", password=" + password
                + ", address=" + address + ", phone=" + phone + ", profilePicture=" + profilePicture + "]";
    }
}
