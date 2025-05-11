package farmify.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestMapping;

import farmify.model.Products;
import farmify.model.Users;

@RequestMapping
public interface ProductsRepository extends JpaRepository<Products, Long> //take Long because its the primary key of jobs table 
{

	List<Products> findByFarmerEmail(String email);
 
}
