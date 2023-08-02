using System.ComponentModel;

namespace Pulse.Api.Application.Security;

public enum Roles
{
    [Description("Full control and access to all features and settings of the system.")]
    Admin,

    [Description("Full control and access to all features and settings within a tenant.")]
    Manager,

    [Description("Basic access and read/write permissions within a tenant.")]
    Editor,

    [Description("Basic access and read-only permissions within a tenant.")]
    Viewer
}