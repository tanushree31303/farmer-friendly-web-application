package farmify.model;
import jakarta.persistence.Column;
//Role based authentication control
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="roles")
public class Roles 
{
	@Id //to make it unique
	@GeneratedValue(strategy = GenerationType.IDENTITY) // id will be generated automatically this is serial number for the table
	@Column(name = "id")
	Long id;
	@Column(name = "role")
	int role;
	@ManyToOne //many mid assigned to one role 
	@JoinColumn(name = "mid")
	Menus menus; // to get mid from menus 
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public int getRole() {
		return role;
	}
	public void setRole(int role) {
		this.role = role;
	}
	public Menus getMenus() {
		return menus;
	}
	public void setMenus(Menus menus) {
		this.menus = menus;
	}
    
}
