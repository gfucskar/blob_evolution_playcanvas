export class EntityUtils {
    static getChildByName(entity: pc.GraphNode, childName: string): pc.GraphNode | undefined {
        return entity.children.find((child) => child.name === childName);
    }
}
