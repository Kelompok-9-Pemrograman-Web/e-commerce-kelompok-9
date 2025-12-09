<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role): Response
    {
        // Cek kolom 'role' di tabel user (sesuai gambar ERD lu)
        if (! $request->user() || $request->user()->role !== $role) {
            // Kalau bukan haknya, tendang ke halaman utama
            return redirect('/');
        }

        return $next($request);
    }
}
