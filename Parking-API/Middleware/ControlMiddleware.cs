
using System.Net;
using System.Text.Json;

public class ControlMiddleware
{
    private readonly RequestDelegate _next;

    public ControlMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext httpContext)
    {
        try
        {
            await _next(httpContext);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(httpContext, ex);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

        var response = new { message = "Ha ocurrido un error en el servidor", error = exception.Message };

        await context.Response.WriteAsync(JsonSerializer.Serialize(response));
    }
}
