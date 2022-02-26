import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { Repository } from "./repos";

export function Repo() {
  const params = useParams();
  const currentRepository = params["*"] as string;

  const queryClient = useQueryClient();

  async function handleChangeRepositoryDescription() {
    const previusRepos = queryClient.getQueryData<Repository[]>(["repos"]);

    if (previusRepos) {
      const nextRepos = previusRepos.map((repo) => {
        if (repo.full_name === currentRepository) {
          return { ...repo, description: "Testing" };
        } else {
          return repo;
        }
      });

      queryClient.setQueryData("repos", nextRepos);
    }
  }

  return (
    <div>
      <h1>{currentRepository}</h1>
      <button onClick={handleChangeRepositoryDescription}>
        Alterar Descrição
      </button>
    </div>
  );
}
