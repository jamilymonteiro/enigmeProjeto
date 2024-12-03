package br.com.enigme.enigme.repository;

import br.com.enigme.enigme.entity.Cliente;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClienteRepository extends CrudRepository<Cliente, Long> {

    @Query("SELECT c FROM Cliente c WHERE c.email = :email")
    Optional<Cliente> findByEmail(@Param("email") String email);

    @Query("SELECT c FROM Cliente c WHERE c.cpf = :cpf")
    Optional<Cliente> findByCpf(@Param("cpf") String cpf);

    @Query("SELECT c FROM Cliente c WHERE c.login = :login")
    Optional<Cliente> findByLogin(@Param("login") String login);

    @Query("SELECT c FROM Cliente c WHERE c.email = :email AND c.senha = :senha")
    Optional<Cliente> findByEmailAndSenha(@Param("email") String email, @Param("senha") String senha);
}
