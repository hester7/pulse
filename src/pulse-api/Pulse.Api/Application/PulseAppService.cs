using Pulse.Api.Application.Features.Posts;
using Pulse.Api.Application.Features.Users;

namespace Pulse.Api.Application;

public sealed class PulseAppService
{
    public PulseAppService(PostsRepository postsRepository,
        UsersRepository usersRepository)
    {
        Posts = postsRepository;
        Users = usersRepository;
    }

    public PostsRepository Posts { get; }
    public UsersRepository Users { get; }
}