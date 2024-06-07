// Um repositório, no contexto de desenvolvimento de software e arquitetura de sistemas,
// serve para gerenciar o acesso a dados de uma aplicação
// EU PRECISO TER ACESSO AOS DADOS DE POST PARA EXECUTAR O CASO DE USO E DAR A RESPOSTA AO USUÁRIO

import { Post } from '../../enterprise/entities/post'

export abstract class PostsRepository {
  abstract create(post: Post): Promise<string> // Este método cria um novo post no banco de dados e retorna o ID do post criado.
  // abstract findById(id: string): Promise<Post | null> // Este método busca um post pelo seu ID. Se o post for encontrado, ele é retornado; caso contrário, retorna null.
  abstract findAll(): Promise<Post[]> // Este método recupera todos os posts no banco de dados e os retorna como uma matriz (array) de objetos Post.
  // abstract update(post: Post): Promise<void> // Este método atualiza um post existente no banco de dados com os dados fornecidos.
  // abstract delete(id: string): Promise<void> // Este método exclui um post do banco de dados com base no seu ID.
}

// operações CRUD (Create, Read, Update, Delete) básicas para manipular posts em um site
