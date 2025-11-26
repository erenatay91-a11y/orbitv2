// Orbit API Service Layer for Supabase
// This file provides a unified API interface for the Orbit application

(function() {
    'use strict';

    // Wait for Supabase client to be initialized
    function getClient() {
        if (!window.supabaseClient) {
            console.warn('[OrbitApi] Supabase client not initialized');
            return null;
        }
        return window.supabaseClient;
    }

    // Helper to get current user
    function getCurrentUser() {
        const client = getClient();
        if (!client) return null;
        // Get user from auth session
        return client.auth.getUser().then(({ data, error }) => {
            if (error || !data?.user) return null;
            return data.user;
        });
    }

    // Auth Service
    const authService = {
        async signup({ email, password, username, displayName }) {
            const client = getClient();
            if (!client) {
                console.error('[OrbitApi] Signup: Client not available');
                console.error('[OrbitApi] Debug info:', {
                    hasWindow: typeof window !== 'undefined',
                    hasSupabase: typeof window.supabase !== 'undefined',
                    hasSupabaseClient: typeof window.supabaseClient !== 'undefined',
                    supabaseClient: window.supabaseClient
                });
                return { data: null, error: { message: 'Supabase client not initialized' } };
            }

            try {
                console.log('[OrbitApi] Signup: Attempting signup for', email);
                console.log('[OrbitApi] Signup: Client available:', {
                    hasClient: !!client,
                    clientType: typeof client,
                    hasAuth: !!client.auth,
                    hasSignUp: typeof client.auth?.signUp === 'function'
                });
                
                // Sign up with email and password
                // Note: If email confirmation is required, user will need to confirm email before login
                const signUpOptions = {
                    email,
                    password,
                    options: {
                        data: {
                            username,
                            display_name: displayName
                        },
                        emailRedirectTo: window.location.origin || 'http://localhost:5500'
                    }
                };
                
                console.log('[OrbitApi] Signup: Calling signUp with options:', {
                    email: signUpOptions.email,
                    hasPassword: !!signUpOptions.password,
                    username: signUpOptions.options.data.username,
                    redirectTo: signUpOptions.options.emailRedirectTo
                });
                
                const { data: authData, error: authError } = await client.auth.signUp(signUpOptions);

                console.log('[OrbitApi] Signup response:', { 
                    hasUser: !!authData?.user, 
                    hasSession: !!authData?.session,
                    userId: authData?.user?.id,
                    userEmail: authData?.user?.email,
                    emailConfirmed: !!authData?.user?.email_confirmed_at,
                    error: authError,
                    fullResponse: authData
                });

                if (authError) {
                    console.error('[OrbitApi] Signup error:', authError);
                    console.error('[OrbitApi] Error details:', {
                        message: authError.message,
                        status: authError.status,
                        code: authError.code,
                        name: authError.name,
                        stack: authError.stack
                    });
                    return { data: null, error: authError };
                }

                if (!authData?.user) {
                    console.error('[OrbitApi] Signup succeeded but no user returned');
                    console.error('[OrbitApi] Full authData:', authData);
                    return { 
                        data: null, 
                        error: { message: 'Kayıt başarısız: Kullanıcı oluşturulamadı' } 
                    };
                }

                console.log('[OrbitApi] User created successfully:', {
                    id: authData.user.id,
                    email: authData.user.email,
                    emailConfirmed: !!authData.user.email_confirmed_at,
                    createdAt: authData.user.created_at
                });

                // Create user profile in profiles table
                if (authData.user) {
                    console.log('[OrbitApi] Creating profile for user:', authData.user.id);
                    try {
                        const { data: profileData, error: profileError } = await client
                            .from('profiles')
                            .insert({
                                id: authData.user.id,
                                username: username,
                                display_name: displayName,
                                email: email,
                                avatar_url: null,
                                avatar_color: null,
                                created_at: new Date().toISOString()
                            })
                            .select()
                            .single();

                        if (profileError) {
                            console.error('[OrbitApi] Profile creation failed:', profileError);
                            // If profile already exists, that's okay
                            if (!profileError.message?.includes('duplicate') && !profileError.code?.includes('23505')) {
                                console.warn('[OrbitApi] Profile creation error (non-duplicate):', profileError);
                            }
                        } else {
                            console.log('[OrbitApi] Profile created successfully:', profileData);
                        }
                    } catch (profileErr) {
                        console.error('[OrbitApi] Profile creation exception:', profileErr);
                    }
                } else {
                    console.warn('[OrbitApi] No user in authData, cannot create profile');
                }

                // Check if email confirmation is required
                if (authData.user && !authData.session) {
                    return { 
                        data: { user: authData.user }, 
                        error: { 
                            message: 'Kayıt başarılı! Email adresinize gönderilen onay linkine tıklayarak hesabınızı aktifleştirin.',
                            code: 'email_confirmation_required'
                        } 
                    };
                }

                return { data: { user: authData.user }, error: null };
            } catch (error) {
                console.error('[OrbitApi] Signup exception:', error);
                return { data: null, error: { message: error.message || 'Kayıt başarısız' } };
            }
        },

        async login({ email, password }) {
            const client = getClient();
            if (!client) {
                return { data: null, error: { message: 'Supabase client not initialized' } };
            }

            try {
                const { data, error } = await client.auth.signInWithPassword({
                    email,
                    password
                });

                if (error) {
                    console.error('[OrbitApi] Login error:', error);
                    // Check if email needs confirmation
                    if (error.message?.includes('Email not confirmed') || error.message?.includes('email_not_confirmed')) {
                        return { 
                            data: null, 
                            error: { 
                                message: 'Email adresinizi onaylamanız gerekiyor. Email kutunuzu kontrol edin.',
                                code: 'email_not_confirmed'
                            } 
                        };
                    }
                    return { data: null, error };
                }

                if (!data?.user) {
                    return { 
                        data: null, 
                        error: { message: 'Kullanıcı bulunamadı' } 
                    };
                }

                return { data: { user: data.user }, error: null };
            } catch (error) {
                console.error('[OrbitApi] Login exception:', error);
                return { data: null, error: { message: error.message || 'Giriş başarısız' } };
            }
        },

        async logout() {
            const client = getClient();
            if (!client) return { error: { message: 'Supabase client not initialized' } };
            
            const { error } = await client.auth.signOut();
            return { error };
        },

        async getProfile(userId) {
            const client = getClient();
            if (!client) {
                return { data: null, error: { message: 'Supabase client not initialized' } };
            }

            try {
                const { data, error } = await client
                    .from('profiles')
                    .select('*')
                    .eq('id', userId)
                    .single();

                if (error) {
                    return { data: null, error };
                }

                return { data, error: null };
            } catch (error) {
                return { data: null, error: { message: error.message } };
            }
        },

        async getCurrentSession() {
            const client = getClient();
            if (!client) {
                return { data: null, error: { message: 'Supabase client not initialized' } };
            }

            const { data, error } = await client.auth.getSession();
            return { data, error };
        }
    };

    // Posts Service
    const postsService = {
        async createPost({ groupId, title, content, image_url, video_url, is_sensitive }) {
            const client = getClient();
            if (!client) {
                return { id: null, error: { message: 'Supabase client not initialized' } };
            }

            try {
                const user = await getCurrentUser();
                if (!user) {
                    return { id: null, error: { message: 'User not authenticated' } };
                }

                const { data, error } = await client
                    .from('posts')
                    .insert({
                        author_id: user.id,
                        group_id: groupId || null,
                        title: title || null,
                        content: content || '',
                        image_url: image_url || null,
                        video_url: video_url || null,
                        is_sensitive: is_sensitive || false,
                        created_at: new Date().toISOString()
                    })
                    .select()
                    .single();

                if (error) {
                    return { id: null, error };
                }

                return { ...data, error: null };
            } catch (error) {
                return { id: null, error: { message: error.message } };
            }
        },

        async updatePost(postId, { title, content, image_url, video_url, is_sensitive }) {
            const client = getClient();
            if (!client) {
                return { id: null, error: { message: 'Supabase client not initialized' } };
            }

            try {
                const user = await getCurrentUser();
                if (!user) {
                    return { id: null, error: { message: 'User not authenticated' } };
                }

                const updateData = {};
                if (title !== undefined) updateData.title = title;
                if (content !== undefined) updateData.content = content;
                if (image_url !== undefined) updateData.image_url = image_url;
                if (video_url !== undefined) updateData.video_url = video_url;
                if (is_sensitive !== undefined) updateData.is_sensitive = is_sensitive;

                const { data, error } = await client
                    .from('posts')
                    .update(updateData)
                    .eq('id', postId)
                    .eq('author_id', user.id) // Ensure user owns the post
                    .select()
                    .single();

                if (error) {
                    return { id: null, error };
                }

                return { ...data, error: null };
            } catch (error) {
                return { id: null, error: { message: error.message } };
            }
        },

        async deletePost(postId) {
            const client = getClient();
            if (!client) {
                return { error: { message: 'Supabase client not initialized' } };
            }

            try {
                const user = await getCurrentUser();
                if (!user) {
                    return { error: { message: 'User not authenticated' } };
                }

                const { error } = await client
                    .from('posts')
                    .delete()
                    .eq('id', postId)
                    .eq('author_id', user.id); // Ensure user owns the post

                return { error };
            } catch (error) {
                return { error: { message: error.message } };
            }
        },

        async listFeed({ limit = 20, groupId = null } = {}) {
            const client = getClient();
            if (!client) {
                return [];
            }

            try {
                const user = await getCurrentUser();
                let query = client
                    .from('posts')
                    .select(`
                        *,
                        profiles:author_id (
                            id,
                            username,
                            display_name,
                            avatar_url,
                            avatar_color
                        ),
                        groups:group_id (
                            id,
                            name,
                            slug,
                            category
                        )
                    `)
                    .order('created_at', { ascending: false })
                    .limit(limit);

                if (groupId) {
                    query = query.eq('group_id', groupId);
                }

                const { data, error } = await query;

                if (error) {
                    console.error('[OrbitApi] listFeed error:', error);
                    return [];
                }

                return data || [];
            } catch (error) {
                console.error('[OrbitApi] listFeed exception:', error);
                return [];
            }
        },

        async likePost(postId) {
            const client = getClient();
            if (!client) {
                return { error: { message: 'Supabase client not initialized' } };
            }

            try {
                const user = await getCurrentUser();
                if (!user) {
                    return { error: { message: 'User not authenticated' } };
                }

                // Check if like already exists
                const { data: existing } = await client
                    .from('post_likes')
                    .select('id')
                    .eq('post_id', postId)
                    .eq('user_id', user.id)
                    .single();

                if (existing) {
                    return { error: null }; // Already liked
                }

                // Create like
                const { error } = await client
                    .from('post_likes')
                    .insert({
                        post_id: postId,
                        user_id: user.id,
                        created_at: new Date().toISOString()
                    });

                return { error };
            } catch (error) {
                return { error: { message: error.message } };
            }
        },

        async unlikePost(postId) {
            const client = getClient();
            if (!client) {
                return { error: { message: 'Supabase client not initialized' } };
            }

            try {
                const user = await getCurrentUser();
                if (!user) {
                    return { error: { message: 'User not authenticated' } };
                }

                const { error } = await client
                    .from('post_likes')
                    .delete()
                    .eq('post_id', postId)
                    .eq('user_id', user.id);

                return { error };
            } catch (error) {
                return { error: { message: error.message } };
            }
        }
    };

    // Groups Service
    const groupsService = {
        async listGroups() {
            const client = getClient();
            if (!client) {
                return [];
            }

            try {
                const { data, error } = await client
                    .from('groups')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) {
                    console.error('[OrbitApi] listGroups error:', error);
                    return [];
                }

                return data || [];
            } catch (error) {
                console.error('[OrbitApi] listGroups exception:', error);
                return [];
            }
        },

        async listMyJoinedGroupIds() {
            const client = getClient();
            if (!client) {
                return [];
            }

            try {
                const user = await getCurrentUser();
                if (!user) {
                    return [];
                }

                const { data, error } = await client
                    .from('group_members')
                    .select('group_id')
                    .eq('user_id', user.id);

                if (error) {
                    console.error('[OrbitApi] listMyJoinedGroupIds error:', error);
                    return [];
                }

                return (data || []).map(item => item.group_id);
            } catch (error) {
                console.error('[OrbitApi] listMyJoinedGroupIds exception:', error);
                return [];
            }
        },

        async createGroup({ name, slug, about, category, cover_gradient, icon_url, is_private }) {
            const client = getClient();
            if (!client) {
                return { id: null, error: { message: 'Supabase client not initialized' } };
            }

            try {
                const user = await getCurrentUser();
                if (!user) {
                    return { id: null, error: { message: 'User not authenticated' } };
                }

                const { data, error } = await client
                    .from('groups')
                    .insert({
                        name,
                        slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
                        about: about || null,
                        category: category || null,
                        cover_gradient: cover_gradient || null,
                        icon_url: icon_url || null,
                        is_private: is_private || false,
                        owner_id: user.id,
                        created_at: new Date().toISOString()
                    })
                    .select()
                    .single();

                if (error) {
                    return { id: null, error };
                }

                // Auto-join the creator
                await client
                    .from('group_members')
                    .insert({
                        group_id: data.id,
                        user_id: user.id,
                        role: 'owner',
                        joined_at: new Date().toISOString()
                    });

                return { ...data, error: null };
            } catch (error) {
                return { id: null, error: { message: error.message } };
            }
        },

        async joinGroup(groupId) {
            const client = getClient();
            if (!client) {
                return { error: { message: 'Supabase client not initialized' } };
            }

            try {
                const user = await getCurrentUser();
                if (!user) {
                    return { error: { message: 'User not authenticated' } };
                }

                // Check if already a member
                const { data: existing } = await client
                    .from('group_members')
                    .select('id')
                    .eq('group_id', groupId)
                    .eq('user_id', user.id)
                    .single();

                if (existing) {
                    return { error: null }; // Already a member
                }

                const { error } = await client
                    .from('group_members')
                    .insert({
                        group_id: groupId,
                        user_id: user.id,
                        role: 'member',
                        joined_at: new Date().toISOString()
                    });

                return { error };
            } catch (error) {
                return { error: { message: error.message } };
            }
        },

        async leaveGroup(groupId) {
            const client = getClient();
            if (!client) {
                return { error: { message: 'Supabase client not initialized' } };
            }

            try {
                const user = await getCurrentUser();
                if (!user) {
                    return { error: { message: 'User not authenticated' } };
                }

                const { error } = await client
                    .from('group_members')
                    .delete()
                    .eq('group_id', groupId)
                    .eq('user_id', user.id);

                return { error };
            } catch (error) {
                return { error: { message: error.message } };
            }
        }
    };

    // Comments Service
    const commentsService = {
        async addComment({ postId, text, parentId = null }) {
            const client = getClient();
            if (!client) {
                return { id: null, error: { message: 'Supabase client not initialized' } };
            }

            try {
                const user = await getCurrentUser();
                if (!user) {
                    return { id: null, error: { message: 'User not authenticated' } };
                }

                const { data, error } = await client
                    .from('comments')
                    .insert({
                        post_id: postId,
                        author_id: user.id,
                        text: text || '',
                        parent_id: parentId || null,
                        created_at: new Date().toISOString()
                    })
                    .select()
                    .single();

                if (error) {
                    return { id: null, error };
                }

                return { ...data, error: null };
            } catch (error) {
                return { id: null, error: { message: error.message } };
            }
        },

        async listComments(postId) {
            const client = getClient();
            if (!client) {
                return [];
            }

            try {
                const { data, error } = await client
                    .from('comments')
                    .select(`
                        *,
                        profiles:author_id (
                            id,
                            username,
                            display_name,
                            avatar_url,
                            avatar_color
                        )
                    `)
                    .eq('post_id', postId)
                    .is('parent_id', null) // Only top-level comments
                    .order('created_at', { ascending: false });

                if (error) {
                    console.error('[OrbitApi] listComments error:', error);
                    return [];
                }

                return data || [];
            } catch (error) {
                console.error('[OrbitApi] listComments exception:', error);
                return [];
            }
        }
    };

    // Initialize OrbitApi on window
    window.OrbitApi = {
        auth: authService,
        posts: postsService,
        groups: groupsService,
        comments: commentsService
    };

    // Also expose init function for delayed initialization
    window.initOrbitApi = function() {
        if (!window.OrbitApi) {
            window.OrbitApi = {
                auth: authService,
                posts: postsService,
                groups: groupsService,
                comments: commentsService
            };
        }
        console.log('[OrbitApi] Services initialized');
    };

    console.log('[OrbitApi] Services initialized');
    
    // Wait for Supabase client if not ready
    if (!window.supabaseClient) {
        console.warn('[OrbitApi] Supabase client not ready, will retry...');
        let retries = 0;
        const checkClient = setInterval(() => {
            retries++;
            if (window.supabaseClient) {
                console.log('[OrbitApi] Supabase client now available');
                clearInterval(checkClient);
            } else if (retries > 50) {
                console.error('[OrbitApi] Supabase client still not available after 5 seconds');
                clearInterval(checkClient);
            }
        }, 100);
    }
})();

