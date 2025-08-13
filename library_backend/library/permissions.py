from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsOwnerOrReadOnly(BasePermission):
    """
    Custom permission to only allow owners of an object to edit/delete it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions allowed for any request
        if request.method in SAFE_METHODS:
            return True
        # Write permissions only for owner
        return obj.user == request.user
