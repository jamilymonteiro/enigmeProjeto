package br.com.enigme.enigme.repository;

import br.com.enigme.enigme.entity.Usuario;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsuarioRepository extends CrudRepository<Usuario, Long> {

    @Query("SELECT u FROM Usuario u WHERE u.nome LIKE %:nome%")
    List<Usuario> findUsuariosByNome(@Param("nome") String nome);

    @Query("SELECT u FROM Usuario u WHERE u.login = :login")
    Usuario findUsuarioByLogin(@Param("login") String login);

    @Query("SELECT u FROM Usuario u WHERE u.cpf = :cpf")
    Usuario findUsuarioByCpf(@Param("cpf") String cpf);

    @Query("SELECT u FROM Usuario u WHERE u.permissao.id = :permissaoId")
    List<Usuario> findUsuariosByPermissaoId(@Param("permissaoId") Long permissaoId);

    @Query("SELECT u FROM Usuario u WHERE u.email = :email")
    Usuario findUsuarioByEmail(@Param("email") String email);
}